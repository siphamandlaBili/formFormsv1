"use client"

import { db } from "@/configs"
import { jsonForms, formResponses } from "@/configs/schema"
import { eq } from "drizzle-orm"
import { useEffect, use, useState } from "react"
import { Button } from "@/components/ui/button"
import { useFormState } from "@/hooks/useFormState"
import { useFormValidation } from "@/hooks/useFormValidation"
import { createField } from "@/utils/fieldFactory"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { CheckCircle2, Shield, XCircle } from "lucide-react"
import { useUser, SignInButton } from "@clerk/nextjs"

function FormPage({ params }) {
    const { user, isLoaded } = useUser()
    const resolvedParams = use(params)
    const [jsonFormData, setJsonFormData] = useState(null)
    const [formCreator, setFormCreator] = useState(null)
    const [requireAuth, setRequireAuth] = useState(false)
    const [acceptResponses, setAcceptResponses] = useState(true)
    const [closeDate, setCloseDate] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const formState = useFormState()
    const { validateForm } = useFormValidation()

    useEffect(() => {
        resolvedParams?.formId && getFormData()
    }, [resolvedParams])
    
    const getFormData = async () => {
        if (!resolvedParams?.formId) {
            toast.error('Invalid form ID')
            setIsLoading(false)
            return
        }

        setIsLoading(true)
        try {
            const result = await db.select().from(jsonForms)
                .where(eq(jsonForms.id, Number(resolvedParams.formId)))
            
            if (result.length > 0) {
                setJsonFormData(JSON.parse(result[0]?.jsonForm))
                setFormCreator(result[0]?.createdBy)
                setRequireAuth(result[0]?.requireAuth || false)
                setAcceptResponses(result[0]?.acceptResponses !== false)
                setCloseDate(result[0]?.closeDate)
            } else {
                toast.error('Form not found')
            }
        } catch (error) {
            console.error('Error fetching form:', error)
            toast.error('Error loading form')
        } finally {
            setIsLoading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const { formValues } = formState
        
        // Validate form
        const validation = validateForm(jsonFormData, formValues)
        
        if (!validation.isValid) {
            formState.setFieldErrors(validation.errors)
            formState.touchAllFields()
            toast.error('Please fill in all required fields')
            return
        }

        setIsSubmitting(true)
        
        try {
            const response = {
                formId: Number(resolvedParams.formId),
                responses: formValues,
                submittedAt: new Date().toISOString()
            }

            await db.insert(formResponses).values({
                formId: Number(resolvedParams.formId),
                response: JSON.stringify(response),
                createdBy: formCreator,
                respondentEmail: user?.primaryEmailAddress?.emailAddress || null,
                submittedAt: new Date().toISOString()
            })

            toast.success('Form submitted successfully!')
            setIsSubmitted(true)
            formState.clearForm()
        } catch (error) {
            console.error('Error submitting form:', error)
            toast.error('Failed to submit form. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleSubmitAnother = () => {
        setIsSubmitted(false)
        formState.clearForm()
    }

    if (isLoading || !isLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <img 
                        src="/gettingform.png" 
                        alt="Loading..." 
                        className="w-64 h-64 object-contain animate-pulse mx-auto"
                    />
                    <p className="mt-4 text-gray-500">Loading form...</p>
                </div>
            </div>
        )
    }

    if (!jsonFormData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <img 
                        src="/noform.png" 
                        alt="No form found" 
                        className="w-64 h-64 object-contain mx-auto"
                    />
                    <p className="mt-4 text-gray-500">Form not found</p>
                </div>
            </div>
        )
    }

    // Check if authentication is required and user is not signed in
    if (requireAuth && !user) {
        const theme = jsonFormData?.theme || {}
        
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="max-w-md mx-auto px-6 py-12">
                    <div 
                        className="rounded-lg shadow-lg p-8 text-center"
                        style={{
                            backgroundColor: theme.backgroundColor || '#ffffff',
                        }}
                    >
                        <div className="mb-6">
                            <Shield 
                                className="h-16 w-16 mx-auto" 
                                style={{ color: theme.accentColor || '#3b82f6' }}
                            />
                        </div>
                        <h2 
                            className="text-2xl font-bold mb-4"
                            style={{ color: theme.textColor || '#1f2937' }}
                        >
                            Authentication Required
                        </h2>
                        <p 
                            className="text-base mb-8"
                            style={{ color: theme.textColor || '#4b5563' }}
                        >
                            You need to sign in to submit this form.
                        </p>
                        <SignInButton mode="modal">
                            <Button
                                className="w-full"
                                style={{
                                    backgroundColor: theme.buttonColor || '#3b82f6',
                                    color: theme.buttonTextColor || '#ffffff',
                                }}
                            >
                                Sign In to Continue
                            </Button>
                        </SignInButton>
                    </div>
                </div>
            </div>
        )
    }

    // Check if form is closed (either manually or by date)
    const isFormClosed = !acceptResponses || (closeDate && new Date(closeDate) < new Date())

    if (isFormClosed && !isSubmitted) {
        const theme = jsonFormData?.theme || {}
        
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="max-w-md mx-auto px-6 py-12">
                    <div 
                        className="rounded-lg shadow-lg p-8 text-center"
                        style={{
                            backgroundColor: theme.backgroundColor || '#ffffff',
                        }}
                    >
                        <div className="mb-6">
                            <XCircle 
                                className="h-16 w-16 mx-auto" 
                                style={{ color: theme.accentColor || '#ef4444' }}
                            />
                        </div>
                        <h2 
                            className="text-2xl font-bold mb-4"
                            style={{ color: theme.textColor || '#1f2937' }}
                        >
                            Form Closed
                        </h2>
                        <p 
                            className="text-base mb-2"
                            style={{ color: theme.textColor || '#4b5563' }}
                        >
                            This form is no longer accepting responses.
                        </p>
                        {closeDate && new Date(closeDate) < new Date() && (
                            <p 
                                className="text-sm"
                                style={{ color: theme.textColor || '#6b7280' }}
                            >
                                This form closed on {new Date(closeDate).toLocaleString()}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    if (isSubmitted) {
        const theme = jsonFormData?.theme || {}
        
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="max-w-2xl mx-auto px-6 py-12">
                    <div 
                        className="rounded-lg shadow-lg p-12 text-center"
                        style={{
                            backgroundColor: theme.backgroundColor || '#ffffff',
                        }}
                    >
                        <div className="mb-6">
                            <CheckCircle2 
                                className="h-20 w-20 mx-auto" 
                                style={{ color: theme.accentColor || '#22c55e' }}
                            />
                        </div>
                        <h2 
                            className="text-3xl font-bold mb-4"
                            style={{ color: theme.textColor || '#1f2937' }}
                        >
                            Thank you!
                        </h2>
                        <p 
                            className="text-lg mb-8"
                            style={{ color: theme.textColor || '#4b5563' }}
                        >
                            Your response has been submitted successfully.
                        </p>
                        <Button
                            onClick={handleSubmitAnother}
                            style={{
                                backgroundColor: theme.buttonColor || '#3b82f6',
                                color: theme.buttonTextColor || '#ffffff',
                            }}
                        >
                            Submit Another Response
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    const theme = jsonFormData?.theme || {}

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Form Content */}
            <div className="max-w-3xl mx-auto py-12 px-6">
                <div 
                    className="rounded-lg shadow-lg p-8"
                    style={{
                        backgroundColor: theme.backgroundColor || '#ffffff',
                        color: theme.textColor || '#000000',
                    }}
                >
                    {/* Form Header */}
                    <div className="mb-8 text-center">
                        <h1 
                            className="text-2xl font-semibold mb-2"
                            style={{ color: theme.textColor || '#1f2937' }}
                        >
                            {jsonFormData.title || 'Untitled Form'}
                        </h1>
                        {jsonFormData.subheading && (
                            <p 
                                className="text-lg mb-2"
                                style={{ color: theme.textColor || '#4b5563' }}
                            >
                                {jsonFormData.subheading}
                            </p>
                        )}
                        {jsonFormData.description && (
                            <p 
                                className="text-sm whitespace-pre-wrap"
                                style={{ color: theme.textColor || '#6b7280' }}
                            >
                                {jsonFormData.description}
                            </p>
                        )}
                    </div>

                    <Separator className="mb-8" />

                    {/* Form Fields */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {jsonFormData.fields?.map((field, index) => {
                            const fieldName = field.fieldName || field.name
                            return (
                                <div key={index}>
                                    {createField(field, fieldName, formState, theme)}
                                </div>
                            )
                        })}

                        {/* Submit Button */}
                        <div className="pt-6">
                            <Button
                                type="submit"
                                className="w-full text-lg py-6"
                                disabled={isSubmitting}
                                style={{
                                    backgroundColor: theme.buttonColor || '#3b82f6',
                                    color: theme.buttonTextColor || '#ffffff',
                                }}
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default FormPage
