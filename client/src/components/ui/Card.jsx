import { forwardRef } from 'react'

const Card = forwardRef(({
  children,
  className = '',
  padding = 'default',
  hover = false,
  onClick,
  ...props
}, ref) => {
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8',
  }

  const hoverStyles = hover
    ? 'cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:border-teal-500 dark:hover:border-teal-500'
    : ''

  const clickableStyles = onClick ? 'cursor-pointer' : ''

  return (
    <div
      ref={ref}
      onClick={onClick}
      className={`
        bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700
        ${paddingStyles[padding]}
        ${hoverStyles}
        ${clickableStyles}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  )
})

Card.displayName = 'Card'

const CardHeader = ({ children, className = '', action }) => (
  <div className={`flex items-center justify-between mb-4 ${className}`}>
    <div>{children}</div>
    {action && <div>{action}</div>}
  </div>
)

const CardTitle = ({ children, className = '' }) => (
  <h3 className={`text-lg font-semibold text-slate-800 dark:text-white ${className}`}>
    {children}
  </h3>
)

const CardDescription = ({ children, className = '' }) => (
  <p className={`text-sm text-slate-500 dark:text-slate-400 mt-1 ${className}`}>
    {children}
  </p>
)

const CardContent = ({ children, className = '' }) => (
  <div className={className}>{children}</div>
)

const CardDivider = () => (
  <div className="border-t border-slate-200 dark:border-slate-700 my-4" />
)

const CardFooter = ({ children, className = '' }) => (
  <div className={`mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 ${className}`}>
    {children}
  </div>
)

Card.Header = CardHeader
Card.Title = CardTitle
Card.Description = CardDescription
Card.Content = CardContent
Card.Divider = CardDivider
Card.Footer = CardFooter

export default Card
