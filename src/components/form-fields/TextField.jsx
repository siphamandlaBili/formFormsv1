import React from 'react'
import { Input } from '@/components/ui/input'
import { CheckCircle2 } from 'lucide-react'

const TextField = ({ 
  field, 
  fieldName, 
  value, 
  onChange, 
  onBlur, 
  hasError, 
  isFilled 
}) => {
  const fieldType = field.fieldType || field.type

  const commonProps = {
    id: fieldName,
    name: fieldName,
    value: value || '',
    onChange: (e) => onChange(fieldName, e.target.value),
    onBlur: () => onBlur(fieldName),
    placeholder: field.placeholder || `Enter ${field.label?.toLowerCase() || fieldName}`,
    required: field.required,
    className: `transition-colors duration-200 ${
      hasError 
        ? 'border-red-500 focus-visible:ring-red-500/20 focus-visible:border-red-500' 
        : isFilled && !hasError
          ? 'border-green-500 focus-visible:border-green-500'
          : ''
    }`
  }

  const getInputType = () => {
    switch (fieldType?.toLowerCase()) {
      case 'email': return 'email'
      case 'password': return 'password'
      case 'number': return 'number'
      case 'tel':
      case 'phone': return 'tel'
      case 'url': return 'url'
      case 'date': return 'date'
      default: return 'text'
    }
  }

  const shouldShowSuccessIcon = () => {
    return isFilled && !hasError && !['password', 'number', 'date'].includes(fieldType?.toLowerCase())
  }

  const getAdditionalProps = () => {
    const props = {}
    
    if (fieldType?.toLowerCase() === 'number') {
      if (field.min !== undefined) props.min = field.min
      if (field.max !== undefined) props.max = field.max
    }
    
    if (fieldType?.toLowerCase() === 'tel' || fieldType?.toLowerCase() === 'phone') {
      props.pattern = '[0-9]{3}-[0-9]{3}-[0-9]{4}'
    }
    
    return props
  }

  return (
    <div className="relative">
      <Input
        {...commonProps}
        {...getAdditionalProps()}
        type={getInputType()}
      />
      {shouldShowSuccessIcon() && (
        <CheckCircle2 className="absolute right-3 top-3 h-4 w-4 text-green-500" />
      )}
    </div>
  )
}

export default TextField