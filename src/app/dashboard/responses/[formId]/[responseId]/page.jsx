'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { db } from '@/configs'
import { jsonForms, formResponses } from '@/configs/schema'
import { eq } from 'drizzle-orm'
import { ChevronLeft, User, Circle, Paperclip } from 'lucide-react'

function ResponseDetailsPage() {
    const params = useParams()
    const router = useRouter()
    const formId = parseInt(params.formId)
    const responseId = parseInt(params.responseId)
    
    const [response, setResponse] = useState(null)
    const [form, setForm] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (formId && responseId) {
            fetchResponseDetails()
        }
    }, [formId, responseId])

    const fetchResponseDetails = async () => {
        setLoading(true)
        try {
            const [responseResult] = await db.select().from(formResponses)
                .where(eq(formResponses.id, responseId))
            
            const [formResult] = await db.select().from(jsonForms)
                .where(eq(jsonForms.id, formId))

            if (responseResult && formResult) {
                const parsedJson = JSON.parse(formResult.jsonForm)
                const parsedResponse = JSON.parse(responseResult.response)
                
                // Mark as viewed if not already viewed
                if (!responseResult.viewed) {
                    await db.update(formResponses)
                        .set({ viewed: true })
                        .where(eq(formResponses.id, responseId))
                }
                
                setResponse({
                    ...responseResult,
                    parsedResponse: parsedResponse.responses || parsedResponse,
                    viewed: true
                })
                
                setForm({
                    id: formResult.id,
                    title: parsedJson?.title || 'Untitled Form',
                })
            }
        } catch (error) {
            console.error('Error fetching response details:', error)
        } finally {
            setLoading(false)
        }
    }

    const formatTime = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
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

    if (!response || !form) {
        return (
            <div className="py-16 text-center">
                <p className="text-gray-500">Response not found</p>
            </div>
        )
    }

    return (
        <div className="py-6">
            <button
                onClick={() => router.push(`/dashboard/responses/${formId}`)}
                className="flex items-center gap-2 text-primary hover:text-primary/80 mb-6 text-sm font-medium"
            >
                <ChevronLeft size={16} />
                Back to {form.title}
            </button>

            {/* Response Header */}
            <div className="bg-white border rounded-lg p-6 mb-6">
                <h2 className="font-semibold text-xl text-gray-800 mb-4">Response Details</h2>
                
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                        <User size={24} className="text-gray-600" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">
                            {response.respondentEmail?.split('@')[0] || 'Anonymous'}
                        </h3>
                        <p className="text-sm text-gray-500">
                            {response.respondentEmail || 'anonymous'}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                            {formatDate(response.submittedAt)}, {formatTime(response.submittedAt)}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-1.5">
                        <Circle size={12} className="text-gray-400" fill="currentColor" />
                        <span className="text-gray-600">Answered {Object.keys(response.parsedResponse).length} questions</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Paperclip size={14} className="text-gray-400" />
                        <span className="text-gray-600">
                            {Object.values(response.parsedResponse).filter(v => 
                                typeof v === 'string' && v.includes('file')
                            ).length} file attachment
                        </span>
                    </div>
                </div>
            </div>

            {/* Questions & Answers */}
            <div className="bg-white border rounded-lg p-6 mb-20">
                <h3 className="font-semibold text-gray-900 mb-6 text-lg">Questions & Answers</h3>
                <div className="space-y-6">
                    {Object.entries(response.parsedResponse).map(([question, answer], idx) => (
                        <div key={idx} className="pb-6 border-b last:border-b-0">
                            <p className="font-medium text-gray-900 mb-3">{question}</p>
                            {answer ? (
                                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                                    {typeof answer === 'object' ? JSON.stringify(answer, null, 2) : String(answer)}
                                </p>
                            ) : (
                                <p className="text-gray-400 italic">No {question.toLowerCase().includes('email') ? 'email' : 'answer'} provided</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ResponseDetailsPage
