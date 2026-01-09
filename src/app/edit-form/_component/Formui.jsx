import React from 'react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useFormState } from '@/hooks/useFormState'
import { useFormValidation } from '@/hooks/useFormValidation'
import { createField } from '@/utils/fieldFactory'

function Formui({ jsonFormData, isLoading = false }) {
  const formState = useFormState()
  const { validateForm } = useFormValidation()
  
  const {
    formValues,
    isSubmitting,
    touchAllFields,
    setFieldErrors,
    clearForm,
    setSubmitting
  } = formState

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    touchAllFields()
    
    const validation = validateForm(jsonFormData, formValues)
    setFieldErrors(validation.errors)
    
    if (validation.isValid) {
      setSubmitting(true)
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        console.log('Form submitted:', formValues)
        // Handle form submission here
      } catch (error) {
        console.error('Submission error:', error)
      } finally {
        setSubmitting(false)
      }
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
        <div className="pb-4">
          <div className="space-y-2">
            <div className="flex items-start justify-between">
              <div className="flex-1 text-center">
                <h1 className="text-2xl font-semibold text-gray-900">
                  {jsonFormData.title}
                </h1>
                {jsonFormData.subheading && (
                  <p className="text-lg text-gray-600 mt-1">
                    {jsonFormData.subheading}
                  </p>
                )}
              </div>
              {jsonFormData.required && (
                <span className="text-xs font-medium text-red-600 px-2 py-1 rounded-sm">
                  * Required
                </span>
              )}
            </div>
            
            {jsonFormData.description && (
              <>
                <Separator className="my-3" />
                <p className="text-sm text-gray-600">
                  {jsonFormData.description}
                </p>
              </>
            )}
          </div>
        </div>

        <Separator />

        {/* Form Content */}
        <div className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            {jsonFormData.fields?.map((field, index) => {
              const fieldName = field.fieldName || field.name
              return (
                <div key={index}>
                  {createField(field, fieldName, formState)}
                </div>
              )
            })}

            {/* Form Actions */}
            <div className="pt-6 border-t">
              <div className="flex items-center justify-between">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={clearForm}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Clear all
                </Button>
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="min-w-[120px]"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Submitting...
                    </>
                  ) : (
                    'Submit'
                  )}
                </Button>
              </div>
              
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-400">
                  By submitting this form, you confirm that the information provided is accurate.
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Formui