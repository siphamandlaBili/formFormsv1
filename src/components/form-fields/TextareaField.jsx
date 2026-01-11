import { Textarea } from '@/components/ui/textarea'
import { CheckCircle2 } from 'lucide-react'

const TextareaField = ({ 
  field, 
  fieldName, 
  value, 
  onChange, 
  onBlur, 
  hasError, 
  isFilled 
}) => {
  const getValidationClasses = () => {
    if (hasError) {
      return 'border-red-500 focus-visible:ring-red-500/20 focus-visible:border-red-500'
    }
    if (isFilled && !hasError) {
      return 'border-green-500 focus-visible:border-green-500'
    }
    return ''
  }

  const commonProps = {
    id: fieldName,
    name: fieldName,
    value: value || '',
    onChange: (e) => onChange(fieldName, e.target.value),
    onBlur: () => onBlur(fieldName),
    placeholder: field.placeholder || `Enter ${field.label?.toLowerCase() || fieldName}`,
    required: field.required,
    rows: field.rows || 4,
    className: `transition-colors duration-200 ${getValidationClasses()}`
  }

  return (
    <div className="relative">
      <Textarea {...commonProps} />
      {isFilled && !hasError && (
        <CheckCircle2 className="absolute right-3 top-3 h-4 w-4 text-green-500" />
      )}
    </div>
  )
}

export default TextareaField