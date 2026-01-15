"use client"

import { db } from "@/configs"
import { jsonForms } from "@/configs/schema"
import { eq } from "drizzle-orm"
import { useEffect, use, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useFormState } from "@/hooks/useFormState"
import { createField } from "@/utils/fieldFactory"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"

function PreviewForm({ params }) {
    const resolvedParams = use(params)
    const [jsonFormData, setJsonFormData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()
    const formState = useFormState()

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

    const handleSubmit = (e) => {
        e.preventDefault()
        
        const { formValues, validateForm } = formState
        
        if (validateForm(jsonFormData?.fields || [])) {
            console.log('Form submitted with values:', formValues)
            toast.success('Form submitted successfully! (Preview mode)')
            formState.resetForm()
        } else {
            toast.error('Please fill in all required fields')
        }
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <img 
                        src="/gettingform.png" 
                        alt="Loading..." 
                        className="w-64 h-64 object-contain animate-pulse mx-auto"
                    />
                    <p className="mt-4 text-gray-500">Loading form preview...</p>
                </div>
            </div>
        )
    }

    if (!jsonFormData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <img 
                        src="/noform.png" 
                        alt="No form found" 
                        className="w-64 h-64 object-contain mx-auto"
                    />
                    <p className="mt-4 text-gray-500">Form not found</p>
                    <Button onClick={() => router.back()} className="mt-4">
                        Go Back
                    </Button>
                </div>
            </div>
        )
    }

    const theme = jsonFormData?.theme || {}

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="px-10">
                <div className="flex items-center justify-between my-5">
                    <button 
                        onClick={() => router.push(`/edit-form/${resolvedParams?.formId}`)} 
                        className="flex gap-2 items-center cursor-pointer hover:font-semibold"
                    >
                        <ArrowLeft className="h-4 w-4" /> Back to Editor
                    </button>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <ExternalLink className="h-4 w-4" />
                        Preview Mode
                    </div>
                </div>
            </div>

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
                                style={{
                                    backgroundColor: theme.buttonColor || '#3b82f6',
                                    color: theme.buttonTextColor || '#ffffff',
                                }}
                            >
                                Submit
                            </Button>
                        </div>
                    </form>
                </div>

                {/* Preview Notice */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500 bg-yellow-50 border border-yellow-200 rounded-lg py-3 px-4 inline-block">
                        ⚠️ This is a preview. Form submissions will not be saved.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default PreviewForm
