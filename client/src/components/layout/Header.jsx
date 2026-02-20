import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FiBell, FiChevronDown, FiUser, FiSettings, FiLogOut, FiHelpCircle } from 'react-icons/fi'

const Header = ({ title, breadcrumbs = [], notificationCount = 0 }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const dropdownRef = useRef(null)
  const notificationRef = useRef(null)
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setNotificationsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const getRoleLabel = () => {
    switch (user?.role) {
      case 'customer':
        return 'Customer'
      case 'provider':
        return 'Provider'
      case 'admin':
        return 'Administrator'
      default:
        return ''
    }
  }

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-primary-100 shadow-soft">
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center gap-4">
          {breadcrumbs.length > 0 ? (
            <nav className="flex items-center gap-2 text-sm">
              {breadcrumbs.map((crumb, index) => (
                <div key={crumb.href || index} className="flex items-center gap-2">
                  {index > 0 && (
                    <span className="text-primary-300">/</span>
                  )}
                  {crumb.href ? (
                    <Link
                      to={crumb.href}
                      className="text-primary-500 hover:text-primary-700 transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-primary-900 font-medium">{crumb.label}</span>
                  )}
                </div>
              ))}
            </nav>
          ) : (
            <h1 className="text-xl font-semibold text-primary-900">{title}</h1>
          )}
        </div>

        <div className="flex items-center gap-4">
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2 rounded-lg text-primary-500 hover:text-primary-700 hover:bg-primary-50 transition-colors"
            >
              <FiBell className="w-5 h-5" />
              {notificationCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full" />
              )}
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-floating border border-primary-100 animate-scale-in">
                <div className="p-4 border-b border-primary-100">
                  <h3 className="font-semibold text-primary-900">Notifications</h3>
                </div>
                <div className="p-4">
                  <p className="text-sm text-primary-500 text-center py-4">
                    No new notifications
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="h-6 w-px bg-primary-200" />

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-primary-50 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                <span className="text-sm font-medium text-primary-700">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-primary-900">{user?.name || 'User'}</p>
                <p className="text-xs text-primary-500">{getRoleLabel()}</p>
              </div>
              <FiChevronDown className={`w-4 h-4 text-primary-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-floating border border-primary-100 animate-scale-in">
                <div className="py-2">
                  <Link
                    to="/settings"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-primary-700 hover:bg-primary-50 transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <FiUser className="w-4 h-4" />
                    Profile Settings
                  </Link>
                  <Link
                    to="/help"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-primary-700 hover:bg-primary-50 transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <FiHelpCircle className="w-4 h-4" />
                    Help & Support
                  </Link>
                  <div className="my-2 border-t border-primary-100" />
                  <button
                    className="flex items-center gap-3 w-full px-4 py-2 text-sm text-error hover:bg-error-light transition-colors"
                    onClick={() => {
                      setDropdownOpen(false)
                    }}
                  >
                    <FiLogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
