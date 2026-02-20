import { Badge } from '../ui'

const statusConfig = {
  pending: { variant: 'warning', label: 'Pending' },
  accepted: { variant: 'info', label: 'Accepted' },
  provider_arriving: { variant: 'info', label: 'Arriving' },
  in_progress: { variant: 'primary', label: 'In Progress' },
  completed: { variant: 'success', label: 'Completed' },
  cancelled: { variant: 'error', label: 'Cancelled' },
  approved: { variant: 'success', label: 'Approved' },
  rejected: { variant: 'error', label: 'Rejected' },
  active: { variant: 'success', label: 'Active' },
  blocked: { variant: 'error', label: 'Blocked' },
}

const StatusBadge = ({ status, className = '' }) => {
  const config = statusConfig[status] || { variant: 'neutral', label: status }
  
  return (
    <Badge variant={config.variant} className={className}>
      {config.label}
    </Badge>
  )
}

export default StatusBadge
