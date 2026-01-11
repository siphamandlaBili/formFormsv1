import React, { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

const FIELD_TYPES = [
    { value: 'text', label: 'Text Input', description: 'Single line text input' },
    { value: 'number', label: 'Number Input', description: 'Numeric input field' },
    { value: 'textarea', label: 'Textarea', description: 'Multi-line text input' },
    { value: 'select', label: 'Select Dropdown', description: 'Choose from options' },
    { value: 'radio', label: 'Radio Buttons', description: 'Single choice from options' },
    { value: 'checkbox', label: 'Checkbox', description: 'Multiple choice options' }
]

function AddFieldComponent({ onAddField }) {
    const [isOpen, setIsOpen] = useState(false)
    const [fieldType, setFieldType] = useState('')
    const [fieldLabel, setFieldLabel] = useState('')
    const [fieldPlaceholder, setFieldPlaceholder] = useState('')
    const [isRequired, setIsRequired] = useState(false)
    const [options, setOptions] = useState([''])

    const resetForm = () => {
        setFieldType('')
        setFieldLabel('')
        setFieldPlaceholder('')
        setIsRequired(false)
        setOptions([''])
    }

    const handleClose = () => {
        setIsOpen(false)
        resetForm()
    }

    const handleAddOption = () => {
        setOptions([...options, ''])
    }

    const handleRemoveOption = (index) => {
        if (options.length > 1) {
            setOptions(options.filter((_, i) => i !== index))
        }
    }

    const handleOptionChange = (index, value) => {
        const newOptions = [...options]
        newOptions[index] = value
        setOptions(newOptions)
    }

    const handleSubmit = () => {
        if (!fieldType || !fieldLabel.trim()) {
            toast.error('Please fill in all required fields')
            return
        }

        const newField = {
            fieldType,
            fieldLabel: fieldLabel.trim(),
            label: fieldLabel.trim(), // Add this for FieldWrapper compatibility
            fieldName: fieldLabel.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, ''),
            placeholder: fieldPlaceholder.trim() || undefined,
            required: isRequired,
        }

        // Add options for select, radio, and checkbox fields
        if (['select', 'radio', 'checkbox'].includes(fieldType)) {
            const validOptions = options.filter(option => option.trim())
            if (validOptions.length > 0) {
                newField.options = validOptions.map(option => ({
                    value: option.trim().toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, ''),
                    label: option.trim()
                }))
            }
        }

        onAddField(newField)
        toast.success('Field added successfully!')
        handleClose()
    }

    const needsOptions = ['select', 'radio', 'checkbox'].includes(fieldType)

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button 
                    variant="outline" 
                    className="w-full border-dashed border-2 py-5 text-gray-500 hover:text-gray-700 hover:border-gray-400"
                >
                    <Plus className="w-5 h-5 mr-2" />
                    Add New Field
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle >Add New Form Field</DialogTitle>
                    <DialogDescription>
                        Create a new input field for your form
                    </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4 mt-4">
                    {/* Field Type Selection */}
                    <div>
                        <label className="text-sm font-medium mb-2 block">Field Type</label>
                        <Select value={fieldType} onValueChange={setFieldType}>
                            <SelectTrigger>
                                <SelectValue placeholder="Choose field type" />
                            </SelectTrigger>
                            <SelectContent>
                                {FIELD_TYPES.map((type) => (
                                    <SelectItem key={type.value} value={type.value}>
                                        <div>
                                            <div className="font-medium">{type.label}</div>
                                            <div className="text-xs text-gray-500">{type.description}</div>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Field Label */}
                    <div>
                        <label className="text-sm font-medium mb-2 block">Field Label *</label>
                        <Input
                            value={fieldLabel}
                            onChange={(e) => setFieldLabel(e.target.value)}
                            placeholder="Enter field label"
                        />
                    </div>

                    {/* Field Placeholder */}
                    <div>
                        <label className="text-sm font-medium mb-2 block">Placeholder Text</label>
                        <Input
                            value={fieldPlaceholder}
                            onChange={(e) => setFieldPlaceholder(e.target.value)}
                            placeholder="Enter placeholder text (optional)"
                        />
                    </div>

                    {/* Required Toggle */}
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="required"
                            checked={isRequired}
                            onChange={(e) => setIsRequired(e.target.checked)}
                            className="rounded"
                        />
                        <label htmlFor="required" className="text-sm font-medium">
                            Required field
                        </label>
                    </div>

                    {/* Options for select, radio, checkbox */}
                    {needsOptions && (
                        <div>
                            <label className="text-sm font-medium mb-2 block">Options</label>
                            <div className="space-y-2">
                                {options.map((option, index) => (
                                    <div key={index} className="flex gap-2">
                                        <Input
                                            value={option}
                                            onChange={(e) => handleOptionChange(index, e.target.value)}
                                            placeholder={`Option ${index + 1}`}
                                        />
                                        {options.length > 1 && (
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleRemoveOption(index)}
                                            >
                                                <X className="w-4 h-4" />
                                            </Button>
                                        )}
                                    </div>
                                ))}
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={handleAddOption}
                                >
                                    <Plus className="w-4 h-4 mr-1" />
                                    Add Option
                                </Button>
                            </div>
                        </div>
                    )}

                    <div className="flex gap-2 pt-4">
                        <Button
                            onClick={handleSubmit}
                            disabled={!fieldType || !fieldLabel.trim()}
                            className="flex-1"
                        >
                            Add Field
                        </Button>
                        <Button
                            variant="outline"
                            onClick={handleClose}
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default AddFieldComponent