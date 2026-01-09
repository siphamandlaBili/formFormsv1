import React from 'react'

const RadioField = ({ 
  field, 
  fieldName, 
  value, 
  onChange 
}) => {
  return (
    <div className="space-y-2">
      {field.options?.map((option, index) => (
        <label key={index} className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-50 cursor-pointer transition-colors">
          <div className="relative">
            <input
              type="radio"
              name={fieldName}
              value={option.value || option}
              checked={value === (option.value || option)}
              onChange={(e) => onChange(fieldName, e.target.value)}
              className="sr-only"
            />
            <div className={`h-4 w-4 rounded-full border flex items-center justify-center ${
              value === (option.value || option)
                ? 'border-primary'
                : 'border-gray-300'
            }`}>
              {value === (option.value || option) && (
                <div className="h-2 w-2 rounded-full bg-primary" />
              )}
            </div>
          </div>
          <span className="text-sm text-gray-700">{option.label || option}</span>
        </label>
      ))}
    </div>
  )
}

export default RadioField