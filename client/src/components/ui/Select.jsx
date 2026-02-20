import { forwardRef } from 'react'

const Select = forwardRef(({
  label,
  error,
  helperText,
  options = [],
  placeholder = 'Select an option',
  className = '',
  ...props
}, ref) => {
  const hasError = Boolean(error)

  const baseStyles = `
    w-full px-3 py-2.5
    bg-white
    border rounded-md
    text-primary-900
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500
    appearance-none
    cursor-pointer
  `

  const errorStyles = hasError
    ? 'border-error focus:ring-error focus:border-error'
    : 'border-primary-200 hover:border-primary-300'

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-primary-700">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          className={`${baseStyles} ${errorStyles} pr-10`}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option 
              key={option.value} 
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-primary-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      {(error || helperText) && (
        <p className={`text-sm ${hasError ? 'text-error' : 'text-primary-500'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  )
})

Select.displayName = 'Select'

export default Select
