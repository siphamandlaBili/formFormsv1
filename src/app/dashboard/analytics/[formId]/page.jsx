'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { db } from '@/configs'
import { jsonForms, formResponses } from '@/configs/schema'
import { eq, and } from 'drizzle-orm'
import { useUser } from '@clerk/nextjs'
import { ArrowLeft, TrendingDown, AlertCircle } from 'lucide-react'

function FormAnalytics() {
    const params = useParams()
    const router = useRouter()
    const { user } = useUser()
    const formId = parseInt(params.formId)
    
    const [loading, setLoading] = useState(true)
    const [form, setForm] = useState(null)
    const [responses, setResponses] = useState([])
    const [fieldAnalytics, setFieldAnalytics] = useState([])

    useEffect(() => {
        if (formId && user) {
            fetchFormAnalytics()
        }
    }, [formId, user])

    const fetchFormAnalytics = async () => {
        setLoading(true)
        try {
            // Fetch form
            const [formResult] = await db.select().from(jsonForms)
                .where(and(
                    eq(jsonForms.id, formId),
                    eq(jsonForms.createdBy, user.primaryEmailAddress.emailAddress)
                ))

            if (!formResult) {
                setLoading(false)
                return
            }

            const parsedJson = JSON.parse(formResult.jsonForm)
            setForm({
                id: formResult.id,
                title: parsedJson?.title || 'Untitled Form',
                fields: parsedJson?.fields || []
            })

            // Fetch responses
            const responsesResult = await db.select().from(formResponses)
                .where(eq(formResponses.formId, formId))

            setResponses(responsesResult)

            // Analyze field completion
            const fieldStats = {}
            parsedJson?.fields?.forEach(field => {
                fieldStats[field.fieldLabel] = {
                    label: field.fieldLabel,
                    type: field.fieldType,
                    answered: 0,
                    skipped: 0
                }
            })

            responsesResult.forEach(response => {
                const parsedResponse = JSON.parse(response.response)
                const responseData = parsedResponse.responses || parsedResponse

                Object.keys(fieldStats).forEach(fieldLabel => {
                    const answer = responseData[fieldLabel]
                    if (answer && answer !== '' && answer !== null && answer !== undefined) {
                        fieldStats[fieldLabel].answered++
                    } else {
                        fieldStats[fieldLabel].skipped++
                    }
                })
            })

            const analyticsArray = Object.values(fieldStats).map(stat => ({
                ...stat,
                completionRate: responsesResult.length > 0 
                    ? Math.round((stat.answered / responsesResult.length) * 100)
                    : 0
            }))

            setFieldAnalytics(analyticsArray)
        } catch (error) {
            console.error('Error fetching form analytics:', error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="py-8">
                <div className="animate-pulse space-y-4">
                    <div className="h-32 bg-gray-200 rounded"></div>
                    <div className="h-64 bg-gray-200 rounded"></div>
                </div>
            </div>
        )
    }

    if (!form) {
        return (
            <div className="py-16 text-center">
                <p className="text-gray-500">Form not found</p>
            </div>
        )
    }

    const overallCompletionRate = responses.length > 0 && fieldAnalytics.length > 0
        ? Math.round(fieldAnalytics.reduce((acc, field) => acc + field.completionRate, 0) / fieldAnalytics.length)
        : 0

    return (
        <div className="py-6 space-y-6">
            <button
                onClick={() => router.push('/dashboard/analytics')}
                className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 text-sm font-medium"
            >
                <ArrowLeft size={16} />
                Back to Analytics
            </button>

            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">{form.title}</h1>
                <p className="text-gray-500 mt-1">Completion & Drop-off Analysis</p>
            </div>

            {/* Overall Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white border rounded-lg p-6">
                    <div className="text-sm font-medium text-gray-600 mb-1">Total Responses</div>
                    <div className="text-3xl font-bold text-gray-900">{responses.length}</div>
                </div>
                <div className="bg-white border rounded-lg p-6">
                    <div className="text-sm font-medium text-gray-600 mb-1">Overall Completion Rate</div>
                    <div className="text-3xl font-bold text-emerald-600">{overallCompletionRate}%</div>
                </div>
                <div className="bg-white border rounded-lg p-6">
                    <div className="text-sm font-medium text-gray-600 mb-1">Total Fields</div>
                    <div className="text-3xl font-bold text-gray-900">{form.fields.length}</div>
                </div>
            </div>

            {/* Field-by-Field Analysis */}
            <div className="bg-white border rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Field Completion Rates</h2>
                {fieldAnalytics.length > 0 ? (
                    <div className="space-y-4">
                        {fieldAnalytics.map((field, index) => (
                            <div key={index} className="space-y-2">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-medium text-gray-900">{field.label}</h3>
                                            {field.completionRate < 50 && (
                                                <span className="flex items-center gap-1 text-xs text-red-600 bg-red-50 px-2 py-0.5 rounded">
                                                    <AlertCircle className="w-3 h-3" />
                                                    High drop-off
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-500 capitalize">{field.type}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-lg font-semibold text-gray-900">{field.completionRate}%</div>
                                        <div className="text-xs text-gray-500">{field.answered}/{responses.length} answered</div>
                                    </div>
                                </div>
                                {/* Progress Bar */}
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                    <div 
                                        className={`h-3 rounded-full transition-all duration-500 ${
                                            field.completionRate >= 75 ? 'bg-green-500' :
                                            field.completionRate >= 50 ? 'bg-yellow-500' :
                                            'bg-red-500'
                                        }`}
                                        style={{ width: `${field.completionRate}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 text-gray-500">
                        No field data available yet
                    </div>
                )}
            </div>

            {/* Drop-off Insights */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-lg p-6">
                <div className="flex items-start gap-3">
                    <TrendingDown className="w-6 h-6 text-red-600 mt-1" />
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Drop-off Insights</h3>
                        {fieldAnalytics.filter(f => f.completionRate < 50).length > 0 ? (
                            <ul className="space-y-2 text-sm text-gray-700">
                                {fieldAnalytics.filter(f => f.completionRate < 50).map((field, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <span className="text-red-600">•</span>
                                        <span><strong>{field.label}</strong> has only {field.completionRate}% completion - consider making it optional or simplifying it</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-gray-700">Great! All fields have good completion rates (above 50%).</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormAnalytics
