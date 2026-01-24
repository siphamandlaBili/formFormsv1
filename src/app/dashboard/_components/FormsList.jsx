'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { db } from '@/configs'
import { jsonForms } from '@/configs/schema'
import { eq } from 'drizzle-orm'
import { useRouter } from 'next/navigation'
import { Grid3x3, List, Edit, Share2, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'

function FormsList() {
    const { user } = useUser()
    const router = useRouter()
    const [forms, setForms] = useState([])
    const [loading, setLoading] = useState(true)
    const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'

    useEffect(() => {
        if (user) {
            getForms()
        }
    }, [user])

    const getForms = async () => {
        setLoading(true)
        try {
            const result = await db.select().from(jsonForms)
                .where(eq(jsonForms.createdBy, user.primaryEmailAddress.emailAddress))
                .orderBy(jsonForms.id)
            
            // Parse jsonForm to get title and subheading
            const formsWithParsedData = result.map(form => {
                const parsedJson = JSON.parse(form.jsonForm)
                return {
                    ...form,
                    formTitle: parsedJson?.title || 'Untitled Form',
                    formSubheading: parsedJson?.subheading || ''
                }
            })
            
            setForms(formsWithParsedData)
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
        <div className="py-6">
            {/* Grid view on extra small screens only */}
            <div className="sm:hidden grid grid-cols-1 gap-6">
                {forms.map((form) => (
                    <div
                        key={form.id}
                        className="border rounded-lg p-6 hover:shadow-lg transition-shadow bg-white"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex-1">
                                <h3 className="font-semibold text-lg mb-1 truncate">
                                    {form.formTitle || 'Untitled Form'}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    Created {formatDate(form.createdAt)}
                                </p>
                            </div>
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
                        </div>
                        
                        {form.formSubheading && (
                            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                {form.formSubheading}
                            </p>
                        )}

                        <div className="flex gap-2 mt-4">
                            <Button
                                type="button"
                                onClick={() => router.push(`/edit-form/${form.id}`)}
                                variant="outline"
                                size="sm"
                                className="flex-1"
                            >
                                <Edit size={16} />
                            </Button>
                            <Button
                                type="button"
                                onClick={() => router.push(`/preview/${form.id}`)}
                                variant="outline"
                                size="sm"
                                title="Preview"
                            >
                                <Eye size={16} />
                            </Button>
                            <Button
                                type="button"
                                onClick={() => {
                                    navigator.clipboard.writeText(`${window.location.origin}/form/${form.id}`)
                                    alert('Form link copied to clipboard!')
                                }}
                                variant="outline"
                                size="sm"
                                title="Share"
                            >
                                <Share2 size={16} />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            {/* List view on small screens and up */}
            <div className="hidden sm:block space-y-3">
                {forms.map((form) => (
                    <div
                        key={form.id}
                        className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white flex items-center justify-between"
                    >
                        <div className="flex-1">
                            <div className="flex items-center gap-3">
                                <h3 className="font-semibold text-lg">
                                    {form.formTitle || 'Untitled Form'}
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
                            </div>
                            <div className="flex gap-4 mt-1 text-sm text-gray-500">
                                <span>Created {formatDate(form.createdAt)}</span>
                                {form.formSubheading && (
                                    <span className="hidden lg:inline truncate max-w-md">{form.formSubheading}</span>
                                )}
                            </div>
                        </div>
                        
                        <div className="flex gap-2">
                            <Button
                                type="button"
                                onClick={() => router.push(`/edit-form/${form.id}`)}
                                variant="outline"
                                size="sm"
                            >
                                <Edit size={16} className="lg:mr-1" />
                                <span className="hidden lg:inline">Edit</span>
                            </Button>
                            <Button
                                type="button"
                                onClick={() => router.push(`/preview/${form.id}`)}
                                variant="outline"
                                size="sm"
                            >
                                <Eye size={16} className="lg:mr-1" />
                                <span className="hidden lg:inline">Preview</span>
                            </Button>
                            <Button
                                type="button"
                                onClick={() => {
                                    navigator.clipboard.writeText(`${window.location.origin}/form/${form.id}`)
                                    alert('Form link copied to clipboard!')
                                }}
                                variant="outline"
                                size="sm"
                            >
                                <Share2 size={16} className="lg:mr-1" />
                                <span className="hidden lg:inline">Share</span>
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FormsList
