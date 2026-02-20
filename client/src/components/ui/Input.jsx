import { forwardRef } from 'react'

const Input = forwardRef(({
  label,
  error,
  helperText,
  icon: Icon,
  iconPosition = 'left',
  className = '',
  inputClassName = '',
  ...props
}, ref) => {
  const hasError = Boolean(error)

  const baseInputStyles = `
    w-full px-3 py-2.5
    bg-white
    border rounded-md
    text-primary-900 placeholder-primary-400
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500
  `

  const errorStyles = hasError
    ? 'border-error focus:ring-error focus:border-error'
    : 'border-primary-200 hover:border-primary-300'

  const iconPadding = Icon
    ? iconPosition === 'left' ? 'pl-10' : 'pr-10'
    : ''

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-primary-700">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && iconPosition === 'left' && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-primary-400" />
          </div>
        )}
        <input
          ref={ref}
          className={`${baseInputStyles} ${errorStyles} ${iconPadding} ${inputClassName}`}
          {...props}
        />
        {Icon && iconPosition === 'right' && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-primary-400" />
          </div>
        )}
      </div>
      {(error || helperText) && (
        <p className={`text-sm ${hasError ? 'text-error' : 'text-primary-500'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input
