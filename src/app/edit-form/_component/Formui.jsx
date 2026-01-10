
import React, { useState } from 'react'
import { Separator } from '@/components/ui/separator'
import { useFormState } from '@/hooks/useFormState'
import { createField } from '@/utils/fieldFactory'
import FieldEdit from './FieldEdit'
import FormHeaderEdit from './FormHeaderEdit'
import AddFieldComponent from './AddFieldComponent'
import toast from 'daisyui/components/toast'

function Formui({ jsonFormData, isLoading = false, onUpdateFormData }) {
  const formState = useFormState()
  const [editingFieldIndex, setEditingFieldIndex] = useState(null)

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
        const updatedFields = [...(jsonFormData.fields || []), newField]
        
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
            {jsonFormData.fields?.map((field, index) => {
              const fieldName = field.fieldName || field.name
              return (
                <div key={index} className="flex items-start justify-between gap-3">
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
            })}

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