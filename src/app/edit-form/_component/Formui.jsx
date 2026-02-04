
import React, { useState } from 'react'
import { Separator } from '@/components/ui/separator'
import { useFormState } from '@/hooks/useFormState'
import { createField } from '@/utils/fieldFactory'
import FieldEdit from './FieldEdit'
import FormHeaderEdit from './FormHeaderEdit'
import AddFieldComponent from './AddFieldComponent'
import { toast } from 'sonner'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical } from 'lucide-react'

// Sortable Field Item Component
function SortableFieldItem({ field, index, editingFieldIndex, setEditingFieldIndex, handleUpdateField, handleDeleteField, formState }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: field.id || `field-${index}` })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const fieldName = field.fieldName || field.name

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-start gap-3 ${isDragging ? 'z-50' : ''}`}
    >
      <div className="pt-8 cursor-grab active:cursor-grabbing" {...attributes} {...listeners}>
        <GripVertical className="h-5 w-5 text-gray-400 hover:text-gray-600" />
      </div>
      <div className="flex-1">
        {createField(field, fieldName, formState)}
      </div>
      <div className="pt-8">
        <FieldEdit
          field={field}
          fieldName={fieldName}
          onUpdateField={(updatedField) => handleUpdateField(index, updatedField)}
          onDeleteField={() => handleDeleteField(index)}
          isOpen={editingFieldIndex === index}
          onOpenChange={(open) => setEditingFieldIndex(open ? index : null)}
        />
      </div>
    </div>
  )
}

function Formui({ jsonFormData, isLoading = false, onUpdateFormData }) {
  const formState = useFormState()
  const [editingFieldIndex, setEditingFieldIndex] = useState(null)

  // Setup sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  // Handle field update
  const handleUpdateField = (fieldIndex, updatedField) => {
    if (onUpdateFormData && jsonFormData) {
      const updatedFields = [...jsonFormData.fields]
      updatedFields[fieldIndex] = updatedField
      
      const updatedFormData = {
        ...jsonFormData,
        fields: updatedFields
      }
      
      onUpdateFormData(updatedFormData)
    }
  }

  // Handle field deletion
  const handleDeleteField = async (fieldIndex) => {
    try {
      if (onUpdateFormData && jsonFormData) {
        const updatedFields = jsonFormData.fields.filter((_, index) => index !== fieldIndex)
        
        const updatedFormData = {
          ...jsonFormData,
          fields: updatedFields
        }
        
        await onUpdateFormData(updatedFormData)
        
        // Close any open edit popover
        setEditingFieldIndex(null)
      }
    } catch (error) {
      toast.error('Failed to delete field')
    }
  }

  // Handle adding new field
  const handleAddField = async (newField) => {
    try {
      if (onUpdateFormData && jsonFormData) {
        // Add unique id to new field if it doesn't have one
        const fieldWithId = {
          ...newField,
          id: newField.id || `field-${Date.now()}-${Math.random()}`
        }
        const updatedFields = [...(jsonFormData.fields || []), fieldWithId]
        
        const updatedFormData = {
          ...jsonFormData,
          fields: updatedFields
        }
        
        await onUpdateFormData(updatedFormData)
      }
    } catch (error) {
      toast.error('Failed to add field')
    }
  }

  // Handle drag end
  const handleDragEnd = async (event) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = jsonFormData.fields.findIndex(
        (field) => (field.id || `field-${jsonFormData.fields.indexOf(field)}`) === active.id
      )
      const newIndex = jsonFormData.fields.findIndex(
        (field) => (field.id || `field-${jsonFormData.fields.indexOf(field)}`) === over.id
      )

      const reorderedFields = arrayMove(jsonFormData.fields, oldIndex, newIndex)

      const updatedFormData = {
        ...jsonFormData,
        fields: reorderedFields
      }

      // Update with silent save (no success toast for drag operations)
      await onUpdateFormData(updatedFormData, false)
    }
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <img 
          src="/gettingform.png" 
          alt="Getting form..." 
          className="w-full h-full object-contain animate-pulse"
        />
      </div>
    )
  }

  // Show no form image only when not loading and no data
  if (!jsonFormData) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <img 
          src="/noform.png" 
          alt="No form found" 
          className="w-full h-full object-contain"
        />
      </div>
    )
  }

  return (
    <div className="">
      <div className="">
        {/* Form Header */}
        <FormHeaderEdit 
          jsonFormData={jsonFormData} 
          onUpdateFormData={onUpdateFormData}
        />

        <Separator />

        {/* Form Content */}
        <div className="pt-6">
          <form className="space-y-8">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={jsonFormData.fields?.map((field, index) => field.id || `field-${index}`) || []}
                strategy={verticalListSortingStrategy}
              >
                {jsonFormData.fields?.map((field, index) => (
                  <SortableFieldItem
                    key={field.id || `field-${index}`}
                    field={field}
                    index={index}
                    editingFieldIndex={editingFieldIndex}
                    setEditingFieldIndex={setEditingFieldIndex}
                    handleUpdateField={handleUpdateField}
                    handleDeleteField={handleDeleteField}
                    formState={formState}
                  />
                ))}
              </SortableContext>
            </DndContext>

            {/* Add Field Component */}
            <div className="pt-4">
              <AddFieldComponent onAddField={handleAddField} />
            </div>

            {/* Form Actions */}
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-400">
                  form created in formforms AI
                </p>
              </div>
            
          </form>
        </div>
      </div>
    </div>
  )
}

export default Formui