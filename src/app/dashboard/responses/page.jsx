'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { db } from '@/configs'
import { jsonForms, formResponses } from '@/configs/schema'
import { eq } from 'drizzle-orm'
import { FileText, Calendar, Mail, ChevronDown, ChevronRight } from 'lucide-react'

function ResponsesOverview() {
    const { user } = useUser()
    const router = useRouter()
    const [formsWithResponses, setFormsWithResponses] = useState([])
    const [expandedForms, setExpandedForms] = useState({})
    const [loading, setLoading] = useState(true)
    const [totalResponses, setTotalResponses] = useState(0)

    useEffect(() => {
        if (user) {
            fetchFormsWithResponses()
        }
    }, [user])

    const fetchFormsWithResponses = async () => {
        setLoading(true)
        try {
            // Fetch user's forms
            const forms = await db.select().from(jsonForms)
                .where(eq(jsonForms.createdBy, user.primaryEmailAddress.emailAddress))

            // Fetch responses for each form
            const formsData = await Promise.all(forms.map(async (form) => {
                const responses = await db.select().from(formResponses)
                    .where(eq(formResponses.formId, form.id))
                
                const parsedJson = JSON.parse(form.jsonForm)
                const parsedResponses = responses.map(res => ({
                    ...res,
                    parsedResponse: JSON.parse(res.response)
                }))

                return {
                    id: form.id,
                    title: parsedJson?.title || 'Untitled Form',
                    subheading: parsedJson?.subheading || '',
                    fields: parsedJson?.fields || [],
                    createdAt: form.createdAt,
                    responses: parsedResponses,
                    responseCount: responses.length,
                    hasResponses: responses.length > 0
                }
            }))

            // Sort by response count (highest first)
            const sorted = formsData.sort((a, b) => b.responseCount - a.responseCount)
            setFormsWithResponses(sorted)
            setTotalResponses(formsData.reduce((sum, form) => sum + form.responseCount, 0))
        } catch (error) {
            console.error('Error fetching responses:', error)
        } finally {
            setLoading(false)
        }
    }

    const toggleForm = (formId) => {
        setExpandedForms(prev => ({
            ...prev,
            [formId]: !prev[formId]
        }))
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

    return (
        <div className="h-full flex flex-col overflow-auto">
            <div className="pt-6 pb-20">
                <div className="mb-6">
                    <h2 className="font-medium text-3xl mb-2">Responses</h2>
                    <p className="text-gray-500">View and manage all form responses in one place</p>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow border">
                        <div className="flex items-center gap-3 mb-2">
                            <FileText className="text-primary" size={24} />
                            <h3 className="text-gray-500 text-sm font-medium">Total Forms</h3>
                        </div>
                        <p className="text-3xl font-bold">{formsWithResponses.length}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow border">
                        <div className="flex items-center gap-3 mb-2">
                            <Mail className="text-green-600" size={24} />
                            <h3 className="text-gray-500 text-sm font-medium">Total Responses</h3>
                        </div>
                        <p className="text-3xl font-bold">{totalResponses}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow border">
                        <div className="flex items-center gap-3 mb-2">
                            <Calendar className="text-blue-600" size={24} />
                            <h3 className="text-gray-500 text-sm font-medium">Active Forms</h3>
                        </div>
                        <p className="text-3xl font-bold">
                            {formsWithResponses.filter(f => f.hasResponses).length}
                        </p>
                    </div>
                </div>

                {/* Forms List with Expandable Responses */}
                {formsWithResponses.length === 0 ? (
                    <div className="text-center py-16 border rounded-lg bg-gray-50">
                        <p className="text-gray-500 text-lg mb-2">No forms created yet</p>
                        <p className="text-gray-400">Create a form to start collecting responses</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg mb-4">Forms & Responses</h3>
                        {formsWithResponses.map((form) => (
                            <div
                                key={form.id}
                                className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                            >
                                {/* Form Header */}
                                <div 
                                    onClick={() => toggleForm(form.id)}
                                    className="p-5 cursor-pointer hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3 flex-1">
                                            {expandedForms[form.id] ? (
                                                <ChevronDown size={20} className="text-gray-400" />
                                            ) : (
                                                <ChevronRight size={20} className="text-gray-400" />
                                            )}
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-lg mb-1">{form.title}</h4>
                                                {form.subheading && (
                                                    <p className="text-sm text-gray-500">{form.subheading}</p>
                                                )}
                                                <div className="flex gap-4 text-sm text-gray-500 mt-2">
                                                    <span>Created {new Date(form.createdAt).toLocaleDateString()}</span>
                                                    <span className={form.responseCount > 0 ? 'text-primary font-semibold' : ''}>
                                                        {form.responseCount} response{form.responseCount !== 1 ? 's' : ''}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Responses List (Expandable) */}
                                {expandedForms[form.id] && (
                                    <div className="border-t bg-gray-50">
                                        {form.responses.length === 0 ? (
                                            <div className="p-8 text-center text-gray-500">
                                                <Mail size={48} className="mx-auto mb-3 text-gray-300" />
                                                <p>No responses yet</p>
                                                <p className="text-sm mt-1">Share your form to start collecting responses</p>
                                            </div>
                                        ) : (
                                            <div className="divide-y">
                                                {form.responses.map((response) => (
                                                    <div
                                                        key={response.id}
                                                        className="p-4 flex items-center justify-between"
                                                    >
                                                        <div className="flex items-center gap-4 flex-1">
                                                            <div className="bg-primary/10 text-primary font-semibold px-3 py-1.5 rounded text-sm">
                                                                #{response.id}
                                                            </div>
                                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                                <Calendar size={14} />
                                                                {new Date(response.submittedAt).toLocaleString()}
                                                            </div>
                                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                                <Mail size={14} />
                                                                <span className={!response.respondentEmail ? 'italic' : ''}>
                                                                    {response.respondentEmail || 'Anonymous'}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ResponsesOverview
