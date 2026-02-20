const Skeleton = ({ className = '', variant = 'text', lines = 1 }) => {
  const variants = {
    text: 'h-4 rounded',
    title: 'h-6 rounded',
    circle: 'rounded-full',
    rect: 'rounded-lg',
    card: 'h-32 rounded-lg',
    avatar: 'w-10 h-10 rounded-full',
    button: 'h-10 w-24 rounded-md',
    input: 'h-10 rounded-md',
  }

  if (variant === 'text' && lines > 1) {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }, (_, i) => (
          <div
            key={i}
            className={`bg-primary-100 animate-pulse rounded ${i === lines - 1 ? 'w-3/4' : 'w-full'} h-4`}
          />
        ))}
      </div>
    )
  }

  return (
    <div
      className={`bg-primary-100 animate-pulse ${variants[variant]} ${className}`}
    />
  )
}

const SkeletonCard = () => (
  <div className="bg-white rounded-lg shadow-card p-6 space-y-4">
    <div className="flex items-center justify-between">
      <Skeleton variant="title" className="w-1/3" />
      <Skeleton variant="circle" className="w-8 h-8" />
    </div>
    <Skeleton variant="text" lines={2} />
    <div className="flex gap-2">
      <Skeleton variant="button" />
      <Skeleton variant="button" />
    </div>
  </div>
)

const SkeletonTable = ({ rows = 5, cols = 4 }) => (
  <div className="bg-white rounded-lg border border-primary-100 overflow-hidden">
    <div className="bg-primary-50 px-6 py-3 flex gap-4">
      {Array.from({ length: cols }, (_, i) => (
        <Skeleton key={i} className="h-4 flex-1" />
      ))}
    </div>
    {Array.from({ length: rows }, (_, rowIndex) => (
      <div key={rowIndex} className="px-6 py-4 flex gap-4 border-t border-primary-100">
        {Array.from({ length: cols }, (_, colIndex) => (
          <Skeleton key={colIndex} className="h-4 flex-1" />
        ))}
      </div>
    ))}
  </div>
)

Skeleton.Card = SkeletonCard
Skeleton.Table = SkeletonTable

export default Skeleton
