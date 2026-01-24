'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { db } from '@/configs'
import { jsonForms, formResponses } from '@/configs/schema'
import { eq } from 'drizzle-orm'
import { TrendingUp, Users, Clock, Target, ArrowRight, Search, ChevronDown, AlertCircle, TrendingDown } from 'lucide-react'

function AnalyticsPage() {
    const { user } = useUser()
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [forms, setForms] = useState([])
    const [selectedForm, setSelectedForm] = useState(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [analyticsData, setAnalyticsData] = useState({
        totalResponses: 0,
        responsesTrend: [],
        completionRate: 0,
        fieldAnalytics: []
    })

    useEffect(() => {
        if (user) {
            fetchForms()
        }
    }, [user])

    useEffect(() => {
        if (selectedForm) {
            fetchFormAnalytics()
        }
    }, [selectedForm])

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
                    responseCount: responses.length,
                    fields: parsedJson?.fields || [],
                    createdAt: form.createdAt
                }
            }))

            setForms(formsData)
            
            // Auto-select first form if available
            if (formsData.length > 0) {
                setSelectedForm(formsData[0])
            }
        } catch (error) {
            console.error('Error fetching forms:', error)
        } finally {
            setLoading(false)
        }
    }

    const fetchFormAnalytics = async () => {
        if (!selectedForm) return

        try {
            // Fetch responses for selected form
            const responses = await db.select().from(formResponses)
                .where(eq(formResponses.formId, selectedForm.id))

            // Group responses by date for trend analysis
            const responsesByDate = {}
            responses.forEach(response => {
                const date = new Date(response.submittedAt).toLocaleDateString()
                responsesByDate[date] = (responsesByDate[date] || 0) + 1
            })

            // Convert to array for charting (last 7 days)
            const sortedDates = Object.keys(responsesByDate).sort((a, b) => 
                new Date(a) - new Date(b)
            )
            const last7Days = sortedDates.slice(-7)
            const responsesTrend = last7Days.map(date => ({
                date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                responses: responsesByDate[date]
            }))

            // Analyze field completion
            const fieldStats = {}
            selectedForm.fields.forEach(field => {
                fieldStats[field.fieldLabel] = {
                    label: field.fieldLabel,
                    type: field.fieldType,
                    answered: 0,
                    skipped: 0
                }
            })

            responses.forEach(response => {
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

            const fieldAnalytics = Object.values(fieldStats).map(stat => ({
                ...stat,
                completionRate: responses.length > 0 
                    ? Math.round((stat.answered / responses.length) * 100)
                    : 0
            }))

            const avgCompletion = fieldAnalytics.length > 0
                ? Math.round(fieldAnalytics.reduce((acc, field) => acc + field.completionRate, 0) / fieldAnalytics.length)
                : 0

            setAnalyticsData({
                totalResponses: responses.length,
                responsesTrend,
                completionRate: avgCompletion,
                fieldAnalytics
            })
        } catch (error) {
            console.error('Error fetching analytics:', error)
        }
    }

    const filteredForms = forms.filter(form =>
        form.title.toLowerCase().includes(searchQuery.toLowerCase())
    )

    if (loading) {
        return (
            <div className="py-8">
                <div className="animate-pulse space-y-4">
                    <div className="h-32 bg-gray-200 rounded"></div>
                    <div className="h-64 bg-gray-200 rounded"></div>
                    <div className="h-64 bg-gray-200 rounded"></div>
                </div>
            </div>
        )
    }

    if (forms.length === 0) {
        return (
            <div className="py-16 text-center">
                <p className="text-gray-500 text-lg">No forms created yet. Create a form to see analytics!</p>
            </div>
        )
    }

    const maxResponses = Math.max(...analyticsData.responsesTrend.map(d => d.responses), 1)

    return (
        <div className="py-6 space-y-6 overflow-auto h-[calc(100vh-80px)] pb-20">
            {/* Page Header with Form Selector */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
                    <p className="text-gray-500 mt-1">Track your form performance and insights</p>
                </div>

                {/* Form Selector Dropdown */}
                <div className="relative w-full sm:w-96">
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="w-full flex items-center justify-between px-4 py-3 bg-white border-2 border-gray-200 rounded-lg hover:border-emerald-300 focus:outline-none focus:border-emerald-500 transition-colors"
                    >
                        <div className="flex-1 text-left">
                            <div className="text-xs text-gray-500 mb-0.5">Selected Form</div>
                            <div className="font-semibold text-gray-900">{selectedForm?.title || 'Select a form'}</div>
                        </div>
                        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {dropdownOpen && (
                        <>
                            <div 
                                className="fixed inset-0 z-10" 
                                onClick={() => setDropdownOpen(false)}
                            />
                            <div className="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-xl max-h-96 overflow-hidden">
                                {/* Search Input */}
                                <div className="p-3 border-b border-gray-100 sticky top-0 bg-white">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Search forms..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                    </div>
                                </div>

                                {/* Forms List */}
                                <div className="max-h-64 overflow-y-auto">
                                    {filteredForms.length > 0 ? (
                                        filteredForms.map((form) => (
                                            <button
                                                key={form.id}
                                                onClick={() => {
                                                    setSelectedForm(form)
                                                    setDropdownOpen(false)
                                                    setSearchQuery('')
                                                }}
                                                className={`w-full px-4 py-3 text-left hover:bg-emerald-50 transition-colors border-l-4 ${
                                                    selectedForm?.id === form.id 
                                                        ? 'bg-emerald-50 border-emerald-500' 
                                                        : 'border-transparent'
                                                }`}
                                            >
                                                <div className="font-medium text-gray-900">{form.title}</div>
                                                <div className="text-xs text-gray-500 mt-1">
                                                    {form.responseCount} responses • {form.fields.length} fields
                                                </div>
                                            </button>
                                        ))
                                    ) : (
                                        <div className="px-4 py-8 text-center text-gray-500 text-sm">
                                            No forms found
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {selectedForm && (
                <>
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-emerald-700">Total Responses</span>
                                <Users className="w-5 h-5 text-emerald-600" />
                            </div>
                            <div className="text-3xl font-bold text-gray-900">{analyticsData.totalResponses}</div>
                            <div className="flex items-center mt-2 text-sm text-emerald-600">
                                <TrendingUp className="w-4 h-4 mr-1" />
                                <span>All time</span>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-blue-700">Total Fields</span>
                                <Target className="w-5 h-5 text-blue-600" />
                            </div>
                            <div className="text-3xl font-bold text-gray-900">{selectedForm.fields.length}</div>
                            <div className="text-sm text-blue-600 mt-2">
                                Form questions
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-green-50 to-teal-50 border border-green-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-green-700">Completion Rate</span>
                                <TrendingUp className="w-5 h-5 text-green-600" />
                            </div>
                            <div className="text-3xl font-bold text-gray-900">{analyticsData.completionRate}%</div>
                            <div className="text-sm text-green-600 mt-2">
                                Average field completion
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-purple-700">Avg. Response Time</span>
                                <Clock className="w-5 h-5 text-purple-600" />
                            </div>
                            <div className="text-3xl font-bold text-gray-900">--</div>
                            <div className="text-sm text-purple-600 mt-2">
                                Coming soon
                            </div>
                        </div>
                    </div>

                    {/* Response Trend Chart */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">Response Trends (Last 7 Days)</h2>
                        {analyticsData.responsesTrend.length > 0 ? (
                            <div className="space-y-4">
                                <div className="h-64 flex items-end gap-3">
                                    {analyticsData.responsesTrend.map((item, index) => (
                                        <div key={index} className="flex-1 flex flex-col items-center group">
                                            <div className="relative w-full">
                                                <div 
                                                    className="w-full bg-gradient-to-t from-emerald-500 to-green-400 rounded-t-lg transition-all duration-300 hover:from-emerald-600 hover:to-green-500 cursor-pointer"
                                                    style={{ height: `${(item.responses / maxResponses) * 200}px`, minHeight: '20px' }}
                                                >
                                                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap shadow-lg">
                                                        {item.responses} responses
                                                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <span className="text-xs text-gray-600 mt-3 font-medium">{item.date}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-16 text-gray-500">
                                No response data available yet
                            </div>
                        )}
                    </div>

                    {/* Field Completion Analysis */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">Field Completion & Drop-off Analysis</h2>
                        {analyticsData.fieldAnalytics.length > 0 ? (
                            <div className="space-y-4">
                                {analyticsData.fieldAnalytics.map((field, index) => (
                                    <div key={index} className="space-y-2 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="font-medium text-gray-900">{field.label}</h3>
                                                    {field.completionRate < 50 && (
                                                        <span className="flex items-center gap-1 text-xs text-red-600 bg-red-100 px-2 py-0.5 rounded-full">
                                                            <AlertCircle className="w-3 h-3" />
                                                            High drop-off
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-sm text-gray-500 capitalize">{field.type}</p>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-2xl font-bold text-gray-900">{field.completionRate}%</div>
                                                <div className="text-xs text-gray-500 mt-1">{field.answered}/{analyticsData.totalResponses} answered</div>
                                            </div>
                                        </div>
                                        {/* Progress Bar */}
                                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                            <div 
                                                className={`h-3 rounded-full transition-all duration-500 ${
                                                    field.completionRate >= 75 ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                                                    field.completionRate >= 50 ? 'bg-gradient-to-r from-yellow-400 to-orange-400' :
                                                    'bg-gradient-to-r from-red-500 to-pink-500'
                                                }`}
                                                style={{ width: `${field.completionRate}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16 text-gray-500">
                                No field data available yet
                            </div>
                        )}
                    </div>

                    {/* Drop-off Insights */}
                    {analyticsData.fieldAnalytics.filter(f => f.completionRate < 50).length > 0 && (
                        <div className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-xl p-6">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <TrendingDown className="w-5 h-5 text-red-600" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900 mb-3 text-lg">⚠️ Drop-off Insights</h3>
                                    <ul className="space-y-2 text-sm text-gray-700">
                                        {analyticsData.fieldAnalytics.filter(f => f.completionRate < 50).map((field, index) => (
                                            <li key={index} className="flex items-start gap-2 bg-white bg-opacity-50 p-3 rounded-lg">
                                                <span className="text-red-600 font-bold">•</span>
                                                <span><strong className="text-red-700">{field.label}</strong> has only <strong>{field.completionRate}%</strong> completion - consider making it optional or simplifying the question</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default AnalyticsPage
