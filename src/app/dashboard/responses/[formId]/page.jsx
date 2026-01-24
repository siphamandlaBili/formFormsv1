'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { db } from '@/configs'
import { jsonForms, formResponses } from '@/configs/schema'
import { eq } from 'drizzle-orm'
import { ChevronLeft, FileText, User } from 'lucide-react'

function FormResponsesPage() {
    const params = useParams()
    const router = useRouter()
    const formId = parseInt(params.formId)
    
    const [form, setForm] = useState(null)
    const [responses, setResponses] = useState([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState('all')
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        if (formId) {
            fetchFormAndResponses()
        }
    }, [formId])

    const fetchFormAndResponses = async () => {
        setLoading(true)
        try {
            const [formResult] = await db.select().from(jsonForms).where(eq(jsonForms.id, formId))
            
            if (formResult) {
                const responsesResult = await db.select().from(formResponses)
                    .where(eq(formResponses.formId, formId))
                
                const parsedJson = JSON.parse(formResult.jsonForm)
                const parsedResponses = responsesResult.map(res => {
                    const parsed = JSON.parse(res.response)
                    return {
                        ...res,
                        parsedResponse: parsed.responses || parsed
                    }
                })

                setForm({
                    id: formResult.id,
                    title: parsedJson?.title || 'Untitled Form',
                    subheading: parsedJson?.subheading || '',
                    fields: parsedJson?.fields || [],
                    createdAt: formResult.createdAt
                })
                setResponses(parsedResponses)
            }
        } catch (error) {
            console.error('Error fetching form responses:', error)
        } finally {
            setLoading(false)
        }
    }

    const getFilteredResponses = () => {
        let filtered = responses
        
        // Filter by view status
        if (filter === 'new') {
            filtered = filtered.filter(response => !response.viewed)
        } else if (filter === 'viewed') {
            filtered = filtered.filter(response => response.viewed)
        }
        
        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter(response => 
                response.respondentEmail?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                JSON.stringify(response.parsedResponse).toLowerCase().includes(searchQuery.toLowerCase())
            )
        }
        
        return filtered
    }

    const getTimeAgo = (dateString) => {
        const date = new Date(dateString)
        const now = new Date()
        const seconds = Math.floor((now - date) / 1000)
        
        if (seconds < 60) return 'Just now'
        if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`
        if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`
        if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`
        return date.toLocaleDateString()
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

    if (!form) {
        return (
            <div className="py-16 text-center">
                <p className="text-gray-500">Form not found</p>
            </div>
        )
    }

    return (
        <div className="py-6">
            <button
                onClick={() => router.push('/dashboard/responses')}
                className="flex items-center gap-2 text-primary hover:text-primary/80 mb-6 text-sm font-medium"
            >
                <ChevronLeft size={16} />
                Back to Forms
            </button>

            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
                <div>
                    <h2 className="font-semibold text-2xl text-gray-800 mb-2">{form.title}</h2>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span className="font-semibold text-gray-900">{responses.length} Responses</span>
                        <span>•</span>
                        <span>Last updated {getTimeAgo(form.createdAt)}</span>
                    </div>
                </div>
                
                {/* Filter Tabs */}
                <div className="flex gap-2">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                            filter === 'all' 
                                ? 'bg-primary text-white' 
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setFilter('new')}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                            filter === 'new' 
                                ? 'bg-primary text-white' 
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        New
                    </button>
                    <button
                        onClick={() => setFilter('viewed')}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                            filter === 'viewed' 
                                ? 'bg-primary text-white' 
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        Viewed
                    </button>
                </div>
            </div>

            {/* Search */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search responses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="max-w-md px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
            </div>

            {/* Responses List */}
            {getFilteredResponses().length === 0 ? (
                <div className="py-16 text-center border rounded-lg bg-gray-50">
                    <FileText size={48} className="text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 text-lg mb-2">No responses yet</p>
                    <p className="text-gray-400 text-sm">Responses will appear here once users submit the form</p>
                </div>
            ) : (
                <>
                    {/* Grid view on extra small screens only */}
                    <div className="sm:hidden space-y-3 pb-20">
                        {getFilteredResponses().map((response, idx) => (
                            <div
                                key={response.id}
                                onClick={() => router.push(`/dashboard/responses/${formId}/${response.id}`)}
                                className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white cursor-pointer"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                                        <User size={20} className="text-gray-600" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-semibold text-gray-900">
                                                {response.respondentEmail?.split('@')[0] || 'Anonymous'}
                                            </span>
                                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                                                response.viewed ? 'bg-gray-100 text-gray-600' : 'bg-green-100 text-green-700'
                                            }`}>
                                                {response.viewed ? 'Viewed' : 'New'}
                                            </span>
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {formatDate(response.submittedAt)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* List view on small screens and up */}
                    <div className="hidden sm:block space-y-3 pb-20">
                        {getFilteredResponses().map((response, idx) => (
                            <div
                                key={response.id}
                                onClick={() => router.push(`/dashboard/responses/${formId}/${response.id}`)}
                                className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white flex items-center justify-between cursor-pointer"
                            >
                                <div className="flex items-center gap-4 flex-1">
                                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                                        <User size={20} className="text-gray-600" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-1">
                                            <span className="font-semibold text-gray-900">
                                                {response.respondentEmail?.split('@')[0] || 'Anonymous'}
                                            </span>
                                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                                                response.viewed ? 'bg-gray-100 text-gray-600' : 'bg-green-100 text-green-700'
                                            }`}>
                                                {response.viewed ? 'Viewed' : 'New'}
                                            </span>
                                        </div>
                                        <div className="flex gap-4 text-sm text-gray-500">
                                            <span className="hidden lg:inline">{response.respondentEmail || 'anonymous'}</span>
                                            <span>{formatDate(response.submittedAt)} • {formatTime(response.submittedAt)}</span>
                                            <span className="hidden lg:inline">{Object.keys(response.parsedResponse).length} questions answered</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default FormResponsesPage
