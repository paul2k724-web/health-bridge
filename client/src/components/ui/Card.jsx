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
    ? 'cursor-pointer transition-all duration-200 hover:shadow-elevated hover:-translate-y-0.5'
    : ''

  const clickableStyles = onClick ? 'cursor-pointer' : ''

  return (
    <div
      ref={ref}
      onClick={onClick}
      className={`
        bg-white rounded-lg shadow-card
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
  <h3 className={`text-lg font-semibold text-primary-900 ${className}`}>
    {children}
  </h3>
)

const CardDescription = ({ children, className = '' }) => (
  <p className={`text-sm text-primary-500 mt-1 ${className}`}>
    {children}
  </p>
)

const CardContent = ({ children, className = '' }) => (
  <div className={className}>{children}</div>
)

const CardDivider = () => (
  <div className="border-t border-primary-100 my-4" />
)

const CardFooter = ({ children, className = '' }) => (
  <div className={`mt-4 pt-4 border-t border-primary-100 ${className}`}>
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
