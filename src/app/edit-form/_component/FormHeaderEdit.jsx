import React, { useState, useEffect, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

function FormHeaderEdit({ jsonFormData, onUpdateFormData, theme = {} }) {
    const [editingField, setEditingField] = useState(null)
    const [title, setTitle] = useState('')
    const [subheading, setSubheading] = useState('')
    const [description, setDescription] = useState('')
    const editRef = useRef(null)

    // Update local state when form data changes
    useEffect(() => {
        setTitle(jsonFormData?.title || '')
        setSubheading(jsonFormData?.subheading || '')
        setDescription(jsonFormData?.description || '')
    }, [jsonFormData])

    // Handle click outside to save and close
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (editRef.current && !editRef.current.contains(event.target) && editingField) {
                const isClickingAnotherEditable = event.target.closest('[data-editable]')
                
                if (!isClickingAnotherEditable) {
                    handleSave()
                }
            }
        }

        if (editingField) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [editingField])

    const handleSave = async () => {
        try {
            const updatedFormData = {
                ...jsonFormData,
                title,
                subheading,
                description
            }
            
            await onUpdateFormData(updatedFormData)
            setEditingField(null)
            toast.success('Form updated successfully!')
        } catch (error) {
            toast.error('Failed to update form')
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSave()
        }
        if (e.key === 'Escape') {
            setEditingField(null)
            setTitle(jsonFormData?.title || '')
            setSubheading(jsonFormData?.subheading || '')
            setDescription(jsonFormData?.description || '')
        }
    }

    const startEdit = (field) => setEditingField(field)
    const cancelEdit = () => setEditingField(null)

    const EditableText = ({ field, value, setValue, placeholder, className, Component = "p", isLarge = false }) => {
        if (editingField === field) {
            const InputComponent = Component === "textarea" ? Textarea : Input
            return (
                <div ref={editRef} className="space-y-2">
                    <InputComponent
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onKeyDown={handleKeyPress}
                        className={isLarge ? "text-2xl font-semibold text-center" : "text-lg text-center"}
                        placeholder={placeholder}
                        rows={Component === "textarea" ? 3 : undefined}
                        autoFocus
                    />
                    <div className="flex gap-2 justify-center">
                        <Button size="sm" onClick={handleSave}>Save</Button>
                        <Button size="sm" variant="outline" onClick={cancelEdit}>Cancel</Button>
                    </div>
                </div>
            )
        }

        // Always render as p or specified component for display mode, but handle textarea differently
        const DisplayComponent = Component === "textarea" ? "p" : Component
        
        return (
            <DisplayComponent
                data-editable={field}
                className={className}
                onClick={() => startEdit(field)}
                style={{ color: theme.textColor || undefined }}
            >
                {value || placeholder}
            </DisplayComponent>
        )
    }

    const AddButton = ({ field, text }) => (
        <button
            data-editable={field}
            className="text-sm text-gray-400 hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => startEdit(field)}
        >
            {text}
        </button>
    )

    return (
        <div className="pb-4">
            <div className="space-y-2">
                {/* Title Section */}
                <div className="flex items-start justify-between">
                    <div className="flex-1 text-center group relative">
                        <EditableText
                            field="title"
                            value={title}
                            setValue={setTitle}
                            placeholder="Enter form title"
                            className="text-2xl font-semibold text-gray-900 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded transition-colors"
                            Component="h1"
                            isLarge={true}
                        />

                        {/* Subheading Section */}
                        {subheading || editingField === 'subheading' ? (
                            <div className="relative group/sub mt-1">
                                <EditableText
                                    field="subheading"
                                    value={subheading}
                                    setValue={setSubheading}
                                    placeholder="Enter subheading"
                                    className="text-lg text-gray-600 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded transition-colors"
                                />
                            </div>
                        ) : (
                            <div className="mt-1 group/add">
                                <AddButton field="subheading" text="+ Add subheading" />
                            </div>
                        )}
                    </div>

                    {jsonFormData?.required && (
                        <span className="text-xs font-medium text-red-600 px-2 py-1 rounded-sm">
                            * Required
                        </span>
                    )}
                </div>

                {/* Description Section */}
                {description || editingField === 'description' ? (
                    <>
                        <div className="my-3"><div className="h-px bg-gray-200 w-full"></div></div>
                        <div className="relative group/desc">
                            <EditableText
                                field="description"
                                value={description}
                                setValue={setDescription}
                                placeholder="Enter form description"
                                className="text-sm text-gray-600 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded transition-colors"
                                Component="textarea"
                            />
                        </div>
                    </>
                ) : (
                    <div className="group/add-desc">
                        <AddButton field="description" text="+ Add description" />
                    </div>
                )}
            </div>
        </div>
    )
}

export default FormHeaderEdit