import { AlertCircle, HelpCircle } from 'lucide-react'

const FieldWrapper = ({ 
  children, 
  field, 
  fieldName, 
  error, 
  touched,
  theme = {} 
}) => {
  const hasError = error && touched

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <label 
            htmlFor={fieldName} 
            className="text-sm font-medium"
            style={{ color: theme.labelColor || '#374151' }}
          >
            {field.label || field.fieldLabel || fieldName}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          
          {field.description && (
            <p className="text-xs text-gray-500">{field.description}</p>
          )}
        </div>
        
        {field.helpText && (
          <div className="group/help relative">
            <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
            <div className="absolute right-0 top-full mt-2 w-48 p-2 bg-gray-900 text-white text-xs rounded-md opacity-0 invisible group-hover/help:opacity-100 group-hover/help:visible transition-all duration-150 z-10">
              {field.helpText}
            </div>
          </div>
        )}
      </div>
      
      {children}
      
      {hasError && (
        <div className="flex items-center gap-1 text-red-600 text-sm">
          <AlertCircle className="h-3 w-3 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  )
}

export default FieldWrapper