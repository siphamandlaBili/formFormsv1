import FieldWrapper from '@/components/form-fields/FieldWrapper'
import TextField from '@/components/form-fields/TextField'
import TextareaField from '@/components/form-fields/TextareaField'
import SelectField from '@/components/form-fields/SelectField'
import RadioField from '@/components/form-fields/RadioField'
import CheckboxField from '@/components/form-fields/CheckboxField'

export const createField = (field, fieldName, formState, theme = {}) => {
  const { formValues, errors, touched, handleInputChange, handleBlur } = formState
  const fieldType = field.fieldType || field.type
  const value = formValues[fieldName]
  const error = errors[fieldName]
  const isFieldTouched = touched[fieldName]
  const hasError = error && isFieldTouched
  const isFilled = value && value.toString().trim() !== ''

  const fieldProps = {
    field,
    fieldName,
    value,
    onChange: handleInputChange,
    onBlur: handleBlur,
    hasError,
    isFilled,
    theme
  }

  const renderFieldComponent = () => {
    switch (fieldType?.toLowerCase()) {
      case 'textarea':
      case 'longtext':
      case 'description':
        return <TextareaField {...fieldProps} />
      
      case 'select':
      case 'dropdown':
        return <SelectField {...fieldProps} />
      
      case 'radio':
        return <RadioField {...fieldProps} />
      
      case 'checkbox':
        return <CheckboxField {...fieldProps} />
      
      case 'text':
      case 'input':
      case 'email':
      case 'password':
      case 'number':
      case 'tel':
      case 'phone':
      case 'url':
      case 'date':
      default:
        return <TextField {...fieldProps} />
    }
  }

  return (
    <FieldWrapper
      field={field}
      fieldName={fieldName}
      error={error}
      touched={isFieldTouched}
      theme={theme}
    >
      {renderFieldComponent()}
    </FieldWrapper>
  )
}