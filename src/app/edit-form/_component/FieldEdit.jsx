import { DeleteIcon, Edit } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';


function FieldEdit({ field, fieldName, onUpdateField, onDeleteField, isOpen, onOpenChange }) {
    const [label, setLabel] = useState(field?.label || fieldName || "")
    const [placeholder, setPlaceholder] = useState(field?.placeholder || "");
    const [required, setRequired] = useState(field?.required || false);
    const popoverRef = useRef(null);

    useEffect(() => {
        setLabel(field?.label || fieldName || "")
        setPlaceholder(field?.placeholder || "")
        setRequired(field?.required || false)
    }, [field, fieldName])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target) && isOpen) {
                onOpenChange(false)
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen, onOpenChange])

    const handleSave = async () => {
        if (onUpdateField) {
            try {
                await onUpdateField({
                    ...field,
                    label,
                    placeholder,
                    required
                })
                
                onOpenChange(false)
                toast.success('Field updated successfully!')
                
            } catch (error) {
                toast.error(error?.message || 'Failed to update field')
            }
        }
    }

    const handleDelete = async () => {
        try {
            if (onDeleteField) {
                await onDeleteField()
                toast.success('Field deleted successfully!')
            }
        } catch (error) {
            toast.error(error?.message || 'Failed to delete field')
        }
    }

    const handleEditClick = () => {
        onOpenChange(!isOpen)
    }
    return (
        <div className='flex gap-1 relative'>
            <Edit 
                className='h-5 w-5 text-gray-500 hover:text-primary cursor-pointer' 
                onClick={handleEditClick}
            />
            
            {isOpen && (
                <div 
                    ref={popoverRef}
                    className="absolute top-8 right-8 w-80 bg-white border border-gray-200 shadow-lg rounded-md p-4 z-2"
                >
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Edit Field: {fieldName}</h3>
                        
                        <div className="space-y-2">
                            <Label htmlFor="field-label">Label</Label>
                            <Input
                                id="field-label"
                                value={label}
                                onChange={(e) => setLabel(e.target.value)}
                                placeholder="Enter field label"
                                autoComplete="off"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="field-placeholder">Placeholder</Label>
                            <Input
                                id="field-placeholder"
                                value={placeholder}
                                onChange={(e) => setPlaceholder(e.target.value)}
                                placeholder="Enter placeholder text"
                                autoComplete="off"
                            />
                        </div>

                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="field-required"
                                checked={required}
                                onChange={(e) => setRequired(e.target.checked)}
                                className="rounded border-gray-300"
                            />
                            <Label htmlFor="field-required">Required field</Label>
                        </div>

                        <Button onClick={handleSave} size="sm">
                            Save Changes
                        </Button>
                    </div>
                </div>
            )}

            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <DeleteIcon 
                        className='h-5 w-5 cursor-pointer text-red-500 hover:text-red-800 ml-2' 
                        title="Delete field"
                    />
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle >Delete Field</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete the field "{field?.label || fieldName}"? 
                            This action cannot be undone and will permanently remove this field from your form.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="border-primary text-primary hover:text-white hover:bg-primary/90 focus:ring-primary cursor-pointer">Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                            onClick={handleDelete}
                            className="bg-primary hover:bg-primary/90 focus:ring-primary cursor-pointer"
                        >
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>

    )
}

export default FieldEdit