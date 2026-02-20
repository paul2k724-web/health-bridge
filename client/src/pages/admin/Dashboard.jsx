import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../store/api'
import { DashboardLayout } from '../../components/layout'
import { Card, Badge, Button, Skeleton } from '../../components/ui'
import { StatsCard, EmptyState, StatusBadge } from '../../components/shared'
import { FiUsers, FiBriefcase, FiDollarSign, FiCheckCircle, FiAlertCircle, FiArrowRight, FiTrendingUp, FiActivity, FiUserCheck } from 'react-icons/fi'

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProviders: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    totalRevenue: 0,
    pendingApprovals: 0,
  })
  const [recentBookings, setRecentBookings] = useState([])
  const [pendingProviders, setPendingProviders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [dashboardRes, providersRes] = await Promise.all([
        api.get('/admin/dashboard/stats'),
        api.get('/admin/providers?status=pending'),
      ])
      setStats(dashboardRes.data.stats)
      setRecentBookings(dashboardRes.data.recentBookings || [])
      setPendingProviders(providersRes.data.providers?.slice(0, 5) || [])
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton.Card key={i} />
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Skeleton variant="card" className="h-64" />
            <Skeleton variant="card" className="h-64" />
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout title="Dashboard">
      <div className="space-y-8 animate-fade-up">
        <div>
          <h1 className="text-page-title text-primary-900">Admin Dashboard</h1>
          <p className="text-primary-500 mt-1">Monitor and manage your healthcare platform</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Users"
            value={stats.totalUsers}
            icon={FiUsers}
            description="Registered users"
          />
          <StatsCard
            title="Active Providers"
            value={stats.totalProviders}
            icon={FiBriefcase}
            description="Verified providers"
          />
          <StatsCard
            title="Total Bookings"
            value={stats.totalBookings}
            icon={FiActivity}
            description="All time bookings"
          />
          <StatsCard
            title="Monthly Revenue"
            value={`₹${stats.totalRevenue?.toLocaleString() || 0}`}
            icon={FiDollarSign}
            description="This month"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-primary-900 to-primary-800" padding="default">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-primary-300 text-sm font-medium">Pending Bookings</p>
                <p className="text-4xl font-semibold text-white mt-2">{stats.pendingBookings}</p>
                <p className="text-primary-400 text-sm mt-2">Awaiting provider assignment</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
                <FiAlertCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-accent-600 to-accent-700" padding="default">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-accent-100 text-sm font-medium">Completed This Month</p>
                <p className="text-4xl font-semibold text-white mt-2">{stats.completedBookings}</p>
                <p className="text-accent-200 text-sm mt-2">Successfully completed</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
                <FiCheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>

          <Card 
            className={`${stats.pendingApprovals > 0 ? 'ring-2 ring-warning ring-offset-2' : ''}`}
            padding="default"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-primary-500 text-sm font-medium">Pending Approvals</p>
                <p className="text-4xl font-semibold text-primary-900 mt-2">{stats.pendingApprovals}</p>
                <p className="text-primary-400 text-sm mt-2">Provider applications</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-warning-light flex items-center justify-center">
                <FiUserCheck className="w-6 h-6 text-warning" />
              </div>
            </div>
            {stats.pendingApprovals > 0 && (
              <Link 
                to="/admin/providers"
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent-600 hover:text-accent-700"
              >
                Review now <FiArrowRight className="w-4 h-4" />
              </Link>
            )}
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card padding="none">
            <div className="px-6 py-4 border-b border-primary-100 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-primary-900">Provider Approval Queue</h2>
              <Link to="/admin/providers" className="text-sm font-medium text-accent-600 hover:text-accent-700 flex items-center gap-1">
                View all <FiArrowRight className="w-4 h-4" />
              </Link>
            </div>
            {pendingProviders.length === 0 ? (
              <div className="p-6 text-center">
                <FiUserCheck className="w-12 h-12 text-primary-200 mx-auto mb-3" />
                <p className="text-sm text-primary-500">No pending approvals</p>
              </div>
            ) : (
              <div className="divide-y divide-primary-100">
                {pendingProviders.map((provider) => (
                  <div key={provider._id} className="px-6 py-4 hover:bg-primary-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                          <span className="text-sm font-medium text-primary-700">
                            {provider.name?.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-primary-900">{provider.name}</p>
                          <p className="text-sm text-primary-500">{provider.providerProfile?.specialization}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="warning">Pending</Badge>
                        <Link to="/admin/providers">
                          <Button variant="ghost" size="sm">Review</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Card padding="none">
            <div className="px-6 py-4 border-b border-primary-100">
              <h2 className="text-lg font-semibold text-primary-900">Recent Bookings</h2>
            </div>
            {recentBookings.length === 0 ? (
              <EmptyState
                icon={FiActivity}
                title="No recent bookings"
                description="New bookings will appear here"
              />
            ) : (
              <div className="divide-y divide-primary-100">
                {recentBookings.map((booking) => (
                  <div key={booking._id} className="px-6 py-4 hover:bg-primary-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-primary-900">{booking.service?.name}</p>
                        <p className="text-sm text-primary-500 mt-1">
                          Customer: {booking.customer?.name}
                        </p>
                        <p className="text-sm text-primary-400">
                          Provider: {booking.provider?.name || 'Not assigned'}
                        </p>
                      </div>
                      <div className="text-right">
                        <StatusBadge status={booking.status} />
                        <p className="text-lg font-semibold text-primary-900 mt-2">
                          ₹{booking.amount?.finalAmount}
                        </p>
                        <p className="text-xs text-primary-400 mt-1">
                          {new Date(booking.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link to="/admin/users" className="block">
            <Card hover className="h-full">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary-50 flex items-center justify-center">
                  <FiUsers className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-medium text-primary-900">User Management</h3>
                  <p className="text-sm text-primary-500">Manage customers & providers</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link to="/admin/providers" className="block">
            <Card hover className="h-full">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary-50 flex items-center justify-center">
                  <FiUserCheck className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-medium text-primary-900">Provider Approval</h3>
                  <p className="text-sm text-primary-500">Review applications</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link to="/admin/services" className="block">
            <Card hover className="h-full">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary-50 flex items-center justify-center">
                  <FiActivity className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-medium text-primary-900">Service Management</h3>
                  <p className="text-sm text-primary-500">Configure services</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link to="/admin/reports" className="block">
            <Card hover className="h-full">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary-50 flex items-center justify-center">
                  <FiTrendingUp className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-medium text-primary-900">Reports & Analytics</h3>
                  <p className="text-sm text-primary-500">View insights</p>
                </div>
              </div>
            </Card>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default AdminDashboard
