import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getServices } from '../../store/slices/serviceSlice'
import { useTheme } from '../../context/ThemeContext'
import { 
  FiActivity, 
  FiSun, 
  FiMoon, 
  FiArrowRight, 
  FiClock, 
  FiStar,
  FiSearch,
  FiHeart,
  FiShield,
  FiCheckCircle
} from 'react-icons/fi'

const Services = () => {
  const dispatch = useDispatch()
  const { services = [], loading } = useSelector((state) => state.service || {})
  const { user } = useSelector((state) => state.auth || {})
  const { darkMode, toggleDarkMode } = useTheme()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    dispatch(getServices())
  }, [dispatch])

  const categories = ['all', 'General', 'Dental', 'Eye Care', 'Lab Tests', 'Specialist']

  const filteredServices = services.filter((service) => {
    if (!searchQuery) return true
    return (
      service.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  const fallbackServices = [
    {
      _id: '1',
      name: 'General Consultation',
      description: 'Comprehensive health checkup with experienced physicians. Get expert advice on your health concerns.',
      basePrice: 500,
      duration: 30,
      category: 'General',
      rating: 4.9,
      reviews: 234
    },
    {
      _id: '2',
      name: 'Dental Checkup',
      description: 'Complete dental examination including teeth cleaning, cavity check, and oral health assessment.',
      basePrice: 800,
      duration: 45,
      category: 'Dental',
      rating: 4.8,
      reviews: 189
    },
    {
      _id: '3',
      name: 'Eye Examination',
      description: 'Full eye health evaluation including vision testing, eye pressure check, and retina examination.',
      basePrice: 600,
      duration: 30,
      category: 'Eye Care',
      rating: 4.9,
      reviews: 156
    },
    {
      _id: '4',
      name: 'Blood Tests',
      description: 'Complete blood count, lipid profile, and basic metabolic panel. Fasting required for accurate results.',
      basePrice: 300,
      duration: 15,
      category: 'Lab Tests',
      rating: 4.7,
      reviews: 412
    },
    {
      _id: '5',
      name: 'Cardiology Consultation',
      description: 'Heart health assessment with ECG interpretation and cardiovascular risk evaluation.',
      basePrice: 1200,
      duration: 45,
      category: 'Specialist',
      rating: 4.9,
      reviews: 98
    },
    {
      _id: '6',
      name: 'Dermatology Consultation',
      description: 'Skin health evaluation, acne treatment, and dermatological condition assessment.',
      basePrice: 900,
      duration: 30,
      category: 'Specialist',
      rating: 4.8,
      reviews: 145
    },
  ]

  const displayServices = filteredServices.length > 0 ? filteredServices : fallbackServices

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Dental': return '🦷'
      case 'Eye Care': return '👁️'
      case 'Lab Tests': return '🧪'
      case 'Specialist': return '👨‍⚕️'
      default: return '🏥'
    }
  }

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b" style={{ borderColor: 'var(--border-color)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <FiActivity className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">HealthBridge</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <span className="text-sm font-medium text-teal-500">Services</span>
              <a href="/#features" className="text-sm font-medium hover:text-teal-500 transition-colors" style={{ color: 'var(--text-secondary)' }}>
                Features
              </a>
              <a href="/#testimonials" className="text-sm font-medium hover:text-teal-500 transition-colors" style={{ color: 'var(--text-secondary)' }}>
                Testimonials
              </a>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-xl transition-all hover:scale-105"
                style={{ backgroundColor: 'var(--bg-tertiary)' }}
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <FiSun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <FiMoon className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} />
                )}
              </button>
              {user ? (
                <Link to={user.role === 'customer' ? '/customer/dashboard' : '/provider/dashboard'} className="btn-primary text-sm">
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link to="/login" className="px-4 py-2 text-sm font-medium rounded-xl transition-all hover:scale-105" style={{ color: 'var(--text-primary)' }}>
                    Sign In
                  </Link>
                  <Link to="/register" className="btn-primary text-sm">
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-slide-up">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              Healthcare Services
            </h1>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Quality healthcare services at transparent prices. All providers are verified professionals.
            </p>
          </div>

          {/* Search */}
          <div className="max-w-xl mx-auto mb-8 animate-slide-up delay-100">
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border transition-all focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-lg"
                style={{ 
                  backgroundColor: 'var(--card-bg)', 
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)'
                }}
              />
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-8 animate-slide-up delay-200">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:scale-105 ${
                  selectedCategory === category
                    ? 'gradient-bg text-white shadow-lg'
                    : ''
                }`}
                style={selectedCategory !== category ? { 
                  backgroundColor: 'var(--card-bg)', 
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border-color)'
                } : {}}
              >
                {category === 'all' ? 'All Services' : category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {displayServices.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                <FiSearch className="w-8 h-8" style={{ color: 'var(--text-muted)' }} />
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                No services found
              </h3>
              <p style={{ color: 'var(--text-secondary)' }}>
                Try adjusting your search
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayServices.map((service, index) => (
                <div
                  key={service._id || index}
                  className="group rounded-2xl overflow-hidden card-hover animate-slide-up"
                  style={{ 
                    backgroundColor: 'var(--card-bg)', 
                    border: '1px solid var(--border-color)',
                    animationDelay: `${index * 0.05}s`
                  }}
                >
                  {/* Service Header */}
                  <div className="p-6 pb-0">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <span className="text-2xl">{getCategoryIcon(service.category)}</span>
                      </div>
                      {service.discount?.percentage > 0 && (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-orange-500 to-red-500 text-white">
                          {service.discount.percentage}% OFF
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-teal-500 transition-colors" style={{ color: 'var(--text-primary)' }}>
                      {service.name}
                    </h3>
                    
                    <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                      {service.description}
                    </p>
                  </div>

                  {/* Service Meta */}
                  <div className="px-6 py-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4 text-sm" style={{ color: 'var(--text-muted)' }}>
                        <span className="flex items-center gap-1">
                          <FiClock className="w-4 h-4" />
                          {service.duration || 30} min
                        </span>
                        {service.rating && (
                          <span className="flex items-center gap-1">
                            <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
                            {service.rating}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold gradient-text">
                          ₹{service.discount?.percentage 
                            ? Math.round(service.basePrice * (1 - service.discount.percentage / 100))
                            : service.basePrice}
                        </span>
                        {service.discount?.percentage > 0 && (
                          <span className="text-sm ml-2 line-through" style={{ color: 'var(--text-muted)' }}>
                            ₹{service.basePrice}
                          </span>
                        )}
                      </div>
                      <Link
                        to={user ? `/booking/${service._id}` : '/login'}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-bg text-white text-sm font-medium hover:shadow-lg transition-all hover:scale-105"
                      >
                        Book
                        <FiArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12 text-sm" style={{ color: 'var(--text-muted)' }}>
            Showing {displayServices.length} service{displayServices.length !== 1 ? 's' : ''}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="animate-slide-up">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center">
                <FiShield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                Verified Providers
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                All healthcare professionals are licensed and background-checked
              </p>
            </div>
            <div className="animate-slide-up delay-100">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                <FiHeart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                Quality Care
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Patient satisfaction is our top priority
              </p>
            </div>
            <div className="animate-slide-up delay-200">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <FiCheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                Instant Booking
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Book appointments in seconds with instant confirmation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t" style={{ borderColor: 'var(--border-color)' }}>
        <div className="max-w-7xl mx-auto text-center">
          <Link to="/" className="inline-flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
              <FiActivity className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">HealthBridge</span>
          </Link>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} HealthBridge. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Services
