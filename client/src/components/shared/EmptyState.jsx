const EmptyState = ({
  icon: Icon,
  title,
  description,
  action,
  actionLabel,
  className = '',
}) => {
  return (
    <div className={`text-center py-12 ${className}`}>
      {Icon && (
        <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center mx-auto mb-4">
          <Icon className="w-8 h-8 text-primary-300" />
        </div>
      )}
      <h3 className="text-lg font-medium text-primary-900 mb-2">{title}</h3>
      {description && (
        <p className="text-primary-500 mb-6 max-w-sm mx-auto">{description}</p>
      )}
      {action && actionLabel && (
        <button
          onClick={action}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary-900 text-white rounded-lg hover:bg-primary-800 transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}

export default EmptyState
