import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const SelectField = ({ 
  field, 
  fieldName, 
  value, 
  onChange, 
  hasError, 
  isFilled,
  theme = {} 
}) => {
  return (
    <Select 
      value={value || ''} 
      onValueChange={(newValue) => onChange(fieldName, newValue)}
    >
      <SelectTrigger 
        className={`w-full ${
          hasError 
            ? 'border-red-500 focus-visible:ring-red-500/20' 
            : isFilled && !hasError
              ? 'border-green-500 focus-visible:border-green-500'
              : ''
        }`}
        style={{
          borderColor: theme.inputBorderColor || '#d1d5db',
          backgroundColor: theme.inputBgColor || '#ffffff',
        }}
      >
        <SelectValue placeholder={field.placeholder || "Select an option"} />
      </SelectTrigger>
      <SelectContent>
        {field.options?.map((option, index) => (
          <SelectItem key={index} value={option.value || option}>
            {option.label || option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default SelectField