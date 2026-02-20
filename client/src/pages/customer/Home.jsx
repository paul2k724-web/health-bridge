import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getServices } from '../../store/slices/serviceSlice'
import { Button, Card } from '../../components/ui'
import { 
  FiActivity, 
  FiShield, 
  FiClock, 
  FiCheckCircle, 
  FiArrowRight,
  FiStar,
  FiUsers,
  FiAward,
} from 'react-icons/fi'

const Home = () => {
  const dispatch = useDispatch()
  const { services = [] } = useSelector((state) => state.service || {})
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(getServices())
  }, [dispatch])

  const features = [
    {
      icon: FiShield,
      title: 'Verified Providers',
      description: 'All healthcare professionals are thoroughly vetted and licensed',
    },
    {
      icon: FiClock,
      title: 'Flexible Scheduling',
      description: 'Book appointments at your convenience, 7 days a week',
    },
    {
      icon: FiActivity,
      title: 'Digital Reports',
      description: 'Access your health records and reports anytime, anywhere',
    },
  ]

  const stats = [
    { value: '500+', label: 'Healthcare Providers' },
    { value: '50K+', label: 'Happy Patients' },
    { value: '100K+', label: 'Appointments Completed' },
    { value: '4.9', label: 'Average Rating' },
  ]

  const testimonials = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Chief Medical Officer',
      content: 'HealthBridge has transformed how we manage our practice. The platform is intuitive and reliable.',
    },
    {
      name: 'Michael Chen',
      role: 'Patient',
      content: 'Booking appointments has never been easier. The entire process is seamless and professional.',
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-primary-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary-900 flex items-center justify-center">
              <FiActivity className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-semibold text-primary-900">HealthBridge</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-primary-600 hover:text-primary-900 font-medium">Services</a>
            <a href="#features" className="text-primary-600 hover:text-primary-900 font-medium">Features</a>
            <a href="#testimonials" className="text-primary-600 hover:text-primary-900 font-medium">Testimonials</a>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <Link to={user.role === 'customer' ? '/customer/dashboard' : user.role === 'provider' ? '/provider/dashboard' : '/admin/dashboard'}>
                <Button variant="primary">Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary">Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 bg-gradient-to-b from-primary-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-100 rounded-full text-accent-700 text-sm font-medium mb-6">
              <FiStar className="w-4 h-4" />
              Trusted by 500+ Healthcare Providers
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-primary-900 leading-tight mb-6">
              Enterprise Healthcare
              <span className="text-accent-600"> Management</span>
            </h1>
            <p className="text-xl text-primary-500 mb-8 max-w-2xl mx-auto">
              Streamline your healthcare operations with our comprehensive, secure, 
              and reliable booking and management platform.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link to="/services">
                <Button variant="primary" size="lg" icon={FiArrowRight} iconPosition="right">
                  Browse Services
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="outline" size="lg">
                  Create Account
                </Button>
              </Link>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl font-bold text-primary-900">{stat.value}</p>
                <p className="text-sm text-primary-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">
              Our Services
            </h2>
            <p className="text-lg text-primary-500 max-w-2xl mx-auto">
              Comprehensive healthcare services delivered by certified professionals at your convenience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.slice(0, 6).map((service) => (
              <Card key={service._id} hover className="group">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-accent-100 flex items-center justify-center">
                    <FiActivity className="w-6 h-6 text-accent-600" />
                  </div>
                  {service.discount?.percentage > 0 && (
                    <span className="px-2 py-1 rounded-full bg-success-light text-success-dark text-xs font-medium">
                      {service.discount.percentage}% OFF
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-primary-900 mb-2 group-hover:text-accent-600 transition-colors">
                  {service.name}
                </h3>
                <p className="text-primary-500 text-sm mb-4 line-clamp-2">
                  {service.description}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-primary-100">
                  <div>
                    <span className="text-2xl font-bold text-primary-900">₹{service.basePrice - (service.basePrice * (service.discount?.percentage || 0)) / 100}</span>
                    {service.discount?.percentage > 0 && (
                      <span className="text-sm text-primary-400 line-through ml-2">₹{service.basePrice}</span>
                    )}
                  </div>
                  <Link
                    to={user ? `/booking/${service._id}` : '/login'}
                    className="text-accent-600 hover:text-accent-700 font-medium text-sm flex items-center gap-1"
                  >
                    Book Now <FiArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/services">
              <Button variant="outline" size="lg" icon={FiArrowRight} iconPosition="right">
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 bg-primary-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6">
                Why Choose HealthBridge?
              </h2>
              <p className="text-lg text-primary-500 mb-8">
                We combine cutting-edge technology with healthcare expertise to deliver 
                a platform that healthcare professionals trust.
              </p>

              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary-900 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary-900 mb-1">{feature.title}</h3>
                      <p className="text-primary-500">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-primary-900 rounded-2xl p-8 text-white">
                <div className="flex items-center gap-3 mb-6">
                  <FiAward className="w-8 h-8 text-accent-400" />
                  <span className="text-xl font-semibold">Enterprise Grade Security</span>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <FiCheckCircle className="w-5 h-5 text-accent-400" />
                    <span>HIPAA Compliant Infrastructure</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FiCheckCircle className="w-5 h-5 text-accent-400" />
                    <span>256-bit SSL Encryption</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FiCheckCircle className="w-5 h-5 text-accent-400" />
                    <span>Regular Security Audits</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FiCheckCircle className="w-5 h-5 text-accent-400" />
                    <span>Data Backup & Recovery</span>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-accent-500 rounded-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">
              Trusted by Healthcare Professionals
            </h2>
            <p className="text-lg text-primary-500 max-w-2xl mx-auto">
              See what doctors and patients say about their experience with HealthBridge
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="h-full">
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FiStar key={star} className="w-5 h-5 text-amber-400 fill-current" />
                  ))}
                </div>
                <p className="text-primary-700 mb-6">{testimonial.content}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                    <FiUsers className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium text-primary-900">{testimonial.name}</p>
                    <p className="text-sm text-primary-500">{testimonial.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary-900">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-primary-300 mb-8 max-w-2xl mx-auto">
            Join thousands of healthcare professionals who trust HealthBridge 
            for their practice management needs.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link to="/register">
              <Button variant="primary" size="lg" className="bg-white text-primary-900 hover:bg-primary-50">
                Create Free Account
              </Button>
            </Link>
            <Link to="/services">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                Explore Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-primary-50 border-t border-primary-100 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <Link to="/" className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary-900 flex items-center justify-center">
                  <FiActivity className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-semibold text-primary-900">HealthBridge</span>
              </Link>
              <p className="text-primary-500 max-w-sm">
                Enterprise healthcare management platform trusted by hospitals, 
                clinics, and healthcare professionals.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-primary-900 mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#services" className="text-primary-500 hover:text-primary-700">Services</a></li>
                <li><a href="#features" className="text-primary-500 hover:text-primary-700">Features</a></li>
                <li><a href="#testimonials" className="text-primary-500 hover:text-primary-700">Testimonials</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-primary-900 mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-primary-500 hover:text-primary-700">Help Center</a></li>
                <li><a href="#" className="text-primary-500 hover:text-primary-700">Privacy Policy</a></li>
                <li><a href="#" className="text-primary-500 hover:text-primary-700">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-primary-200 mt-8 pt-8 text-center">
            <p className="text-primary-500 text-sm">
              © {new Date().getFullYear()} HealthBridge. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
