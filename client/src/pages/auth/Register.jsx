import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { FiUser, FiMail, FiPhone, FiLock, FiActivity, FiArrowRight, FiBriefcase, FiAward, FiClock, FiFileText } from 'react-icons/fi'
import { register } from '../../store/slices/authSlice'
import { Button, Input, Select } from '../../components/ui'
import toast from 'react-hot-toast'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'customer',
    specialization: '',
    experience: '',
    licenseNumber: '',
    bio: '',
  })
  const [step, setStep] = useState(1)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading } = useSelector((state) => state.auth)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (formData.role === 'provider') {
      if (!formData.specialization || !formData.experience || !formData.licenseNumber || !formData.bio) {
        toast.error('Please fill all provider details')
        return
      }
      if (isNaN(formData.experience) || formData.experience < 0) {
        toast.error('Experience must be a valid positive number')
        return
      }
    }
    
    try {
      const result = await dispatch(register(formData)).unwrap()
      toast.success('Registration successful! Please verify OTP.')
      navigate('/verify-otp', { state: { userId: result.userId } })
    } catch (error) {
      toast.error(error || 'Registration failed')
    }
  }

  const roleOptions = [
    { value: 'customer', label: 'Customer - Book healthcare services' },
    { value: 'provider', label: 'Provider - Offer medical/technical services' },
  ]

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
            Join Our Healthcare<br />Network
          </h1>
          
          <p className="text-lg text-primary-300 mb-12 max-w-md">
            Whether you're seeking quality healthcare services or looking to 
            offer your professional expertise, we've got you covered.
          </p>

          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-lg font-medium text-white mb-2">For Customers</h3>
              <p className="text-primary-300 text-sm">
                Access verified healthcare professionals, book appointments, 
                and manage your health records in one place.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-lg font-medium text-white mb-2">For Providers</h3>
              <p className="text-primary-300 text-sm">
                Grow your practice, manage appointments efficiently, 
                and connect with patients who need your expertise.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-surface-base overflow-y-auto">
        <div className="w-full max-w-lg animate-fade-up">
          <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-lg bg-primary-900 flex items-center justify-center">
              <FiActivity className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-semibold text-primary-900">HealthBridge</span>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-primary-900 mb-2">
              Create your account
            </h2>
            <p className="text-primary-500">
              Get started with HealthBridge today
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-card p-8">
            <div className="flex items-center justify-center gap-2 mb-8">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${step >= 1 ? 'bg-primary-900 text-white' : 'bg-primary-100 text-primary-400'}`}>
                1
              </div>
              <div className={`h-0.5 w-12 ${step >= 2 ? 'bg-primary-900' : 'bg-primary-200'}`} />
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${step >= 2 ? 'bg-primary-900 text-white' : 'bg-primary-100 text-primary-400'}`}>
                2
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {step === 1 && (
                <>
                  <Input
                    label="Full Name"
                    icon={FiUser}
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />

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
                    label="Phone Number"
                    type="tel"
                    icon={FiPhone}
                    placeholder="+91 9876543210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />

                  <Input
                    label="Password"
                    type="password"
                    icon={FiLock}
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />

                  <Select
                    label="I want to register as"
                    options={roleOptions}
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  />

                  <Button
                    type="button"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    onClick={() => {
                      if (!formData.name || !formData.email || !formData.phone || !formData.password) {
                        toast.error('Please fill all fields')
                        return
                      }
                      setStep(2)
                    }}
                    icon={FiArrowRight}
                    iconPosition="right"
                  >
                    Continue
                  </Button>
                </>
              )}

              {step === 2 && (
                <>
                  {formData.role === 'customer' ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-success-light rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-success" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-primary-900 mb-2">Ready to create your account?</h3>
                      <p className="text-primary-500 text-sm">Review your details and click register to proceed.</p>
                    </div>
                  ) : (
                    <div className="space-y-5">
                      <div className="bg-info-light rounded-lg p-4 mb-4">
                        <p className="text-sm text-info-dark">
                          <strong>Note:</strong> Provider accounts require admin verification after registration.
                        </p>
                      </div>

                      <Input
                        label="Specialization"
                        icon={FiBriefcase}
                        placeholder="e.g., Cardiology, Dentistry"
                        value={formData.specialization}
                        onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                        required={formData.role === 'provider'}
                      />

                      <Input
                        label="Years of Experience"
                        type="number"
                        icon={FiClock}
                        placeholder="e.g., 5"
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        required={formData.role === 'provider'}
                      />

                      <Input
                        label="License Number"
                        icon={FiAward}
                        placeholder="e.g., MED-2024-001"
                        value={formData.licenseNumber}
                        onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                        required={formData.role === 'provider'}
                      />

                      <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-primary-700">
                          Professional Bio
                        </label>
                        <textarea
                          rows={3}
                          placeholder="Tell us about your professional background"
                          value={formData.bio}
                          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                          className="w-full px-3 py-2.5 bg-white border border-primary-200 rounded-md text-primary-900 placeholder-primary-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-all duration-200"
                          required={formData.role === 'provider'}
                        />
                        <p className="text-xs text-primary-400">Max 500 characters</p>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="secondary"
                      size="lg"
                      className="flex-1"
                      onClick={() => setStep(1)}
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      loading={loading}
                      className="flex-1"
                    >
                      Create Account
                    </Button>
                  </div>
                </>
              )}
            </form>

            <div className="mt-6 pt-6 border-t border-primary-100">
              <p className="text-center text-sm text-primary-500">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="font-medium text-accent-600 hover:text-accent-700"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-primary-400">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
