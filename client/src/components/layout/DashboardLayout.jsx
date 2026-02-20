import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

const DashboardLayout = ({ children, title, breadcrumbs }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location])

  const getPageTitle = () => {
    if (title) return title
    const path = location.pathname
    const segments = path.split('/').filter(Boolean)
    if (segments.length >= 2) {
      return segments[1].charAt(0).toUpperCase() + segments[1].slice(1).replace(/-/g, ' ')
    }
    return 'Dashboard'
  }

  return (
    <div className="min-h-screen bg-surface-base">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <div
        className={`
          transition-all duration-200 ease-smooth
          ${sidebarCollapsed ? 'lg:ml-18' : 'lg:ml-64'}
        `}
      >
        <Header 
          title={getPageTitle()} 
          breadcrumbs={breadcrumbs}
          notificationCount={0}
        />

        <main className="p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-primary-900/50 z-30 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  )
}

export default DashboardLayout
