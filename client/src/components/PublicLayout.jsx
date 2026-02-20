import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/slices/authSlice'
import { FiActivity, FiUser, FiLogOut, FiMenu, FiX } from 'react-icons/fi'
import { useState } from 'react'
import { Button } from './ui'

const Layout = ({ children }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  const getDashboardLink = () => {
    if (!user) return '/login'
    switch (user.role) {
      case 'customer':
        return '/customer/dashboard'
      case 'provider':
        return '/provider/dashboard'
      case 'admin':
        return '/admin/dashboard'
      default:
        return '/'
    }
  }

  return (
    <div className="min-h-screen bg-surface-base">
      <nav className="bg-white border-b border-primary-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-primary-900 flex items-center justify-center">
                  <FiActivity className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-semibold text-primary-900">HealthBridge</span>
              </Link>
            </div>

            <div className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-primary-600 hover:text-primary-900 font-medium text-sm">
                Home
              </Link>
              <Link to="/services" className="text-primary-600 hover:text-primary-900 font-medium text-sm">
                Services
              </Link>
              {user ? (
                <>
                  <Link
                    to={getDashboardLink()}
                    className="text-primary-600 hover:text-primary-900 font-medium text-sm flex items-center gap-1"
                  >
                    <FiUser className="w-4 h-4" />
                    Dashboard
                  </Link>
                  <Button variant="ghost" size="sm" onClick={handleLogout}>
                    <FiLogOut className="w-4 h-4 mr-1" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="ghost" size="sm">Sign In</Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="primary" size="sm">Get Started</Button>
                  </Link>
                </>
              )}
            </div>

            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-primary-600 hover:text-primary-900"
              >
                {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-primary-100">
            <div className="px-4 py-3 space-y-2">
              <Link
                to="/"
                className="block px-4 py-2 text-primary-700 hover:bg-primary-50 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/services"
                className="block px-4 py-2 text-primary-700 hover:bg-primary-50 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Services
              </Link>
              {user ? (
                <>
                  <Link
                    to={getDashboardLink()}
                    className="block px-4 py-2 text-primary-700 hover:bg-primary-50 rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout()
                      setMobileMenuOpen(false)
                    }}
                    className="block w-full text-left px-4 py-2 text-primary-700 hover:bg-primary-50 rounded-lg"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-primary-700 hover:bg-primary-50 rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="block px-4 py-2 bg-primary-900 text-white rounded-lg text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      <main>{children}</main>

      <footer className="bg-primary-900 text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-lg bg-accent-500 flex items-center justify-center">
                  <FiActivity className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-semibold">HealthBridge</span>
              </div>
              <p className="text-primary-300 max-w-sm">
                Enterprise healthcare management platform trusted by hospitals, 
                clinics, and healthcare professionals.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-primary-300">
                <li><Link to="/services" className="hover:text-white">Services</Link></li>
                <li><Link to="/" className="hover:text-white">Features</Link></li>
                <li><Link to="/" className="hover:text-white">About</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-primary-300">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-primary-700 mt-8 pt-8 text-center text-primary-400 text-sm">
            <p>© {new Date().getFullYear()} HealthBridge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout
