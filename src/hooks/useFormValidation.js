export const useFormValidation = () => {
  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  
  // URL validation regex
  const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/

  // Validate individual field
  const validateField = (field, value) => {
    const fieldName = field.fieldName || field.name
    const fieldType = field.fieldType || field.type
    
    // Check required fields
    if (field.required && (!value || value.toString().trim() === '')) {
      return field.errorMessage || `${field.label || fieldName} is required`
    }

    // Skip validation for empty optional fields
    if (!value || value.toString().trim() === '') {
      return null
    }

    // Type-specific validation
    switch (fieldType?.toLowerCase()) {
      case 'email':
        if (!emailRegex.test(value)) {
          return 'Please enter a valid email address'
        }
        break
        
      case 'url':
        if (!urlRegex.test(value)) {
          return 'Please enter a valid URL'
        }
        break
        
      case 'number':
        const numValue = parseFloat(value)
        if (isNaN(numValue)) {
          return 'Please enter a valid number'
        }
        if (field.min !== undefined && numValue < field.min) {
          return `Value must be at least ${field.min}`
        }
        if (field.max !== undefined && numValue > field.max) {
          return `Value must be at most ${field.max}`
        }
        break

      case 'tel':
      case 'phone':
        // Basic phone validation (can be enhanced)
        const phoneRegex = /^[\d\s\-\+\(\)]+$/
        if (!phoneRegex.test(value)) {
          return 'Please enter a valid phone number'
        }
        break
    }

    return null
  }

  // Validate entire form
  const validateForm = (formData, formValues) => {
    const newErrors = {}
    
    formData?.fields?.forEach(field => {
      const fieldName = field.fieldName || field.name
      const value = formValues[fieldName]
      const error = validateField(field, value)
      
      if (error) {
        newErrors[fieldName] = error
      }
    })
    
    return {
      errors: newErrors,
      isValid: Object.keys(newErrors).length === 0
    }
  }

  return {
    validateField,
    validateForm
  }
}