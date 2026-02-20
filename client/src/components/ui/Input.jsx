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
    bg-white dark:bg-slate-900
    border rounded-md
    text-slate-800 dark:text-slate-200 
    placeholder-slate-400 dark:placeholder-slate-500
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500
  `

  const errorStyles = hasError
    ? 'border-red-500 dark:border-red-400 focus:ring-red-500 focus:border-red-500'
    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'

  const iconPadding = Icon
    ? iconPosition === 'left' ? 'pl-10' : 'pr-10'
    : ''

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && iconPosition === 'left' && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-slate-400 dark:text-slate-500" />
          </div>
        )}
        <input
          ref={ref}
          className={`${baseInputStyles} ${errorStyles} ${iconPadding} ${inputClassName}`}
          {...props}
        />
        {Icon && iconPosition === 'right' && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-slate-400 dark:text-slate-500" />
          </div>
        )}
      </div>
      {(error || helperText) && (
        <p className={`text-sm ${hasError ? 'text-red-500 dark:text-red-400' : 'text-slate-500 dark:text-slate-400'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input
