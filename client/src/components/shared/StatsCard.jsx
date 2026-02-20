import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi'

const StatsCard = ({
  title,
  value,
  icon: Icon,
  trend,
  trendValue,
  description,
  className = '',
  onClick,
}) => {
  const isPositiveTrend = trend === 'up'

  return (
    <div
      onClick={onClick}
      className={`
        bg-white rounded-lg shadow-card p-6
        transition-all duration-200
        ${onClick ? 'cursor-pointer hover:shadow-elevated hover:-translate-y-0.5' : ''}
        ${className}
      `}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-primary-500 mb-1">{title}</p>
          <p className="text-3xl font-semibold text-primary-900">{value}</p>
          {description && (
            <p className="text-sm text-primary-400 mt-1">{description}</p>
          )}
          {trendValue && (
            <div className={`flex items-center gap-1 mt-2 ${isPositiveTrend ? 'text-success' : 'text-error'}`}>
              {isPositiveTrend ? (
                <FiTrendingUp className="w-4 h-4" />
              ) : (
                <FiTrendingDown className="w-4 h-4" />
              )}
              <span className="text-sm font-medium">{trendValue}</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className="w-12 h-12 rounded-lg bg-primary-50 flex items-center justify-center">
            <Icon className="w-6 h-6 text-primary-400" />
          </div>
        )}
      </div>
    </div>
  )
}

export default StatsCard
