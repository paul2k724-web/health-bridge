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
        bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6
        transition-all duration-200
        ${onClick ? 'cursor-pointer hover:shadow-lg hover:-translate-y-0.5 hover:border-teal-500 dark:hover:border-teal-500' : ''}
        ${className}
      `}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">{title}</p>
          <p className="text-3xl font-bold text-slate-800 dark:text-white">{value}</p>
          {description && (
            <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">{description}</p>
          )}
          {trendValue && (
            <div className={`flex items-center gap-1 mt-2 ${isPositiveTrend ? 'text-emerald-500' : 'text-red-500'}`}>
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
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-teal-500/20">
            <Icon className="w-6 h-6 text-white" />
          </div>
        )}
      </div>
    </div>
  )
}

export default StatsCard
