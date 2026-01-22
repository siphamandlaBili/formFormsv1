'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { db } from '@/configs'
import { jsonForms, formResponses } from '@/configs/schema'
import { eq } from 'drizzle-orm'
import { Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'

function ResponsesOverview() {
    const { user } = useUser()
    const router = useRouter()
    const [forms, setForms] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (user) {
            fetchForms()
        }
    }, [user])

    const fetchForms = async () => {
        setLoading(true)
        try {
            const formsResult = await db.select().from(jsonForms)
                .where(eq(jsonForms.createdBy, user.primaryEmailAddress.emailAddress))

            const formsData = await Promise.all(formsResult.map(async (form) => {
                const responses = await db.select().from(formResponses)
                    .where(eq(formResponses.formId, form.id))
                
                const parsedJson = JSON.parse(form.jsonForm)

                return {
                    id: form.id,
                    title: parsedJson?.title || 'Untitled Form',
                    subheading: parsedJson?.subheading || '',
                    createdAt: form.createdAt,
                    responseCount: responses.length,
                    acceptResponses: form.acceptResponses,
                    closeDate: form.closeDate,
                    lastResponse: responses.length > 0 ? responses[responses.length - 1].submittedAt : null
                }
            }))

            setForms(formsData)
        } catch (error) {
            console.error('Error fetching forms:', error)
        } finally {
            setLoading(false)
        }
    }

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A'
        return new Date(dateString).toLocaleDateString()
    }

    const getTimeAgo = (dateString) => {
        if (!dateString) return 'Never'
        const date = new Date(dateString)
        const now = new Date()
        const seconds = Math.floor((now - date) / 1000)
        
        if (seconds < 60) return 'Just now'
        if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`
        if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`
        if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`
        return date.toLocaleDateString()
    }

    if (loading) {
        return (
            <div className="py-8">
                <div className="animate-pulse space-y-4">
                    <div className="h-32 bg-gray-200 rounded"></div>
                    <div className="h-32 bg-gray-200 rounded"></div>
                    <div className="h-32 bg-gray-200 rounded"></div>
                </div>
            </div>
        )
    }

    if (forms.length === 0) {
        return (
            <div className="py-16 text-center">
                <p className="text-gray-500 text-lg">No forms created yet. Click "Create Form" to get started!</p>
            </div>
        )
    }

    return (
        <div className="py-6 overflow-auto scrollbar-hide">
            {/* List View */}
            <div className="space-y-3 pb-20">
                {forms.map((form) => (
                    <div
                        key={form.id}
                        className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white flex items-center justify-between"
                    >
                        <div className="flex-1">
                            <div className="flex items-center gap-3">
                                <h3 className="font-semibold text-lg">
                                    {form.title}
                                </h3>
                                {form.acceptResponses === false && (
                                    <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                                        Closed
                                    </span>
                                )}
                                {form.acceptResponses !== false && form.closeDate && new Date(form.closeDate) < new Date() && (
                                    <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                                        Closed
                                    </span>
                                )}
                                {(form.acceptResponses === true || form.acceptResponses === undefined || form.acceptResponses === null) && (!form.closeDate || new Date(form.closeDate) >= new Date()) && (
                                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                                        Open
                                    </span>
                                )}
                            </div>
                            <div className="flex gap-4 mt-1 text-sm text-gray-500">
                                <span>Created {formatDate(form.createdAt)}</span>
                                <span className="font-medium text-primary">{form.responseCount} responses</span>
                                <span>Last response {getTimeAgo(form.lastResponse)}</span>
                            </div>
                        </div>
                        
                        <div className="flex gap-2">
                            <Button
                                type="button"
                                onClick={() => router.push(`/dashboard/responses/${form.id}`)}
                                variant="outline"
                                size="sm"
                            >
                                <Eye size={16} className="mr-1" />
                                View Responses
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ResponsesOverview
