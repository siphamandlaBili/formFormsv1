import { CheckCircle2 } from 'lucide-react'

const CheckboxField = ({ 
  field, 
  fieldName, 
  value, 
  onChange 
}) => {
  return (
    <div className="space-y-2">
      {field.options ? (
        // Multiple checkboxes
        field.options.map((option, index) => (
          <label key={index} className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-50 cursor-pointer transition-colors">
            <div className="relative">
              <input
                type="checkbox"
                name={`${fieldName}_${index}`}
                value={option.value || option}
                checked={(value || []).includes(option.value || option)}
                onChange={(e) => {
                  const currentValues = value || []
                  if (e.target.checked) {
                    onChange(fieldName, [...currentValues, option.value || option])
                  } else {
                    onChange(fieldName, currentValues.filter(v => v !== (option.value || option)))
                  }
                }}
                className="sr-only"
              />
              <div className={`h-4 w-4 rounded border flex items-center justify-center ${
                (value || []).includes(option.value || option)
                  ? 'border-primary bg-primary'
                  : 'border-gray-300'
              }`}>
                {(value || []).includes(option.value || option) && (
                  <CheckCircle2 className="h-3 w-3 text-white" />
                )}
              </div>
            </div>
            <span className="text-sm text-gray-700">{option.label || option}</span>
          </label>
        ))
      ) : (
        // Single checkbox
        <label className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-50 cursor-pointer transition-colors">
          <div className="relative">
            <input
              type="checkbox"
              name={fieldName}
              checked={value || false}
              onChange={(e) => onChange(fieldName, e.target.checked)}
              className="sr-only"
            />
            <div className={`h-4 w-4 rounded border flex items-center justify-center ${
              value
                ? 'border-primary bg-primary'
                : 'border-gray-300'
            }`}>
              {value && (
                <CheckCircle2 className="h-3 w-3 text-white" />
              )}
            </div>
          </div>
          <span className="text-sm text-gray-700">{field.label}</span>
        </label>
      )}
    </div>
  )
}

export default CheckboxField