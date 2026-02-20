import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { FiMail, FiLock, FiActivity, FiArrowRight } from 'react-icons/fi'
import { login, getMe } from '../../store/slices/authSlice'
import { Button, Input } from '../../components/ui'
import toast from 'react-hot-toast'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading } = useSelector((state) => state.auth)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await dispatch(login(formData)).unwrap()
      const user = await dispatch(getMe()).unwrap()
      toast.success('Login successful!')
      if (user.role === 'customer') {
        navigate('/customer/dashboard')
      } else if (user.role === 'provider') {
        navigate('/provider/dashboard')
      } else if (user.role === 'admin') {
        navigate('/admin/dashboard')
      } else {
        navigate('/')
      }
    } catch (error) {
      toast.error(error || 'Login failed')
    }
  }

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-primary-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-accent-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary-600 rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-accent-500 flex items-center justify-center">
              <FiActivity className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-semibold text-white">HealthBridge</span>
          </div>
          
          <h1 className="text-4xl xl:text-5xl font-semibold text-white leading-tight mb-6">
            Enterprise Healthcare<br />Management Platform
          </h1>
          
          <p className="text-lg text-primary-300 mb-12 max-w-md">
            Streamline your healthcare operations with our comprehensive, 
            secure, and reliable booking and management system.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-primary-200">
              <div className="w-8 h-8 rounded-full bg-accent-500/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-accent-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span>HIPAA Compliant & Secure</span>
            </div>
            <div className="flex items-center gap-3 text-primary-200">
              <div className="w-8 h-8 rounded-full bg-accent-500/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-accent-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span>Trusted by 500+ Healthcare Providers</span>
            </div>
            <div className="flex items-center gap-3 text-primary-200">
              <div className="w-8 h-8 rounded-full bg-accent-500/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-accent-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span>24/7 Enterprise Support</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-surface-base">
        <div className="w-full max-w-md animate-fade-up">
          <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-lg bg-primary-900 flex items-center justify-center">
              <FiActivity className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-semibold text-primary-900">HealthBridge</span>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-primary-900 mb-2">
              Welcome back
            </h2>
            <p className="text-primary-500">
              Sign in to access your dashboard
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-card p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Email Address"
                type="email"
                icon={FiMail}
                placeholder="name@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />

              <Input
                label="Password"
                type="password"
                icon={FiLock}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-primary-300 text-accent-500 focus:ring-accent-500"
                  />
                  <span className="text-sm text-primary-600">Remember me</span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-accent-600 hover:text-accent-700"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={loading}
                className="w-full"
                icon={FiArrowRight}
                iconPosition="right"
              >
                Sign In
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-primary-100">
              <p className="text-center text-sm text-primary-500">
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className="font-medium text-accent-600 hover:text-accent-700"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-primary-400">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Contact Support</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
