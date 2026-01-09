import { useState } from 'react'

export const useFormState = (initialValues = {}) => {
  const [formValues, setFormValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Handle input changes
  const handleInputChange = (fieldName, value) => {
    setFormValues(prev => ({
      ...prev,
      [fieldName]: value
    }))
    
    // Mark field as touched
    setTouched(prev => ({
      ...prev,
      [fieldName]: true
    }))
    
    // Clear error when user starts typing
    if (errors[fieldName]) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: ''
      }))
    }
  }

  // Handle field blur
  const handleBlur = (fieldName) => {
    setTouched(prev => ({
      ...prev,
      [fieldName]: true
    }))
  }

  // Set errors
  const setFieldErrors = (newErrors) => {
    setErrors(newErrors)
  }

  // Mark all fields as touched
  const touchAllFields = () => {
    const allTouched = Object.keys(formValues).reduce((acc, key) => ({
      ...acc, 
      [key]: true
    }), {})
    setTouched(allTouched)
  }

  // Clear form
  const clearForm = () => {
    setFormValues({})
    setErrors({})
    setTouched({})
  }

  // Set submitting state
  const setSubmitting = (submitting) => {
    setIsSubmitting(submitting)
  }

  return {
    formValues,
    errors,
    touched,
    isSubmitting,
    handleInputChange,
    handleBlur,
    setFieldErrors,
    touchAllFields,
    clearForm,
    setSubmitting
  }
}