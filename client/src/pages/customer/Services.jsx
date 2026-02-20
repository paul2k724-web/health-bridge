import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getServices } from '../../store/slices/serviceSlice'
import Layout from '../../components/PublicLayout'
import { Card, Button, Skeleton } from '../../components/ui'
import { FiActivity, FiClock, FiArrowRight, FiSearch } from 'react-icons/fi'
import { useState } from 'react'

const Services = () => {
  const dispatch = useDispatch()
  const { services, loading } = useSelector((state) => state.service)
  const { user } = useSelector((state) => state.auth)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    dispatch(getServices())
  }, [dispatch])

  const filteredServices = services.filter((service) => {
    if (!searchQuery) return true
    return (
      service.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-surface-base py-12">
          <div className="max-w-7xl mx-auto px-6">
            <Skeleton variant="title" className="w-48 mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton.Card key={i} />
              ))}
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <div className="min-h-screen bg-surface-base">
      <div className="bg-white border-b border-primary-100">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="max-w-2xl">
            <h1 className="text-page-title text-primary-900 mb-2">Healthcare Services</h1>
            <p className="text-lg text-primary-500">
              Professional healthcare services delivered at your doorstep by verified providers
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-400" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
            />
          </div>
        </div>

        {filteredServices.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
              <FiActivity className="w-8 h-8 text-primary-400" />
            </div>
            <h3 className="text-lg font-medium text-primary-900 mb-2">No services found</h3>
            <p className="text-primary-500">
              {searchQuery ? 'Try adjusting your search terms' : 'No services available at the moment'}
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <Card key={service._id} hover className="group flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-accent-100 flex items-center justify-center group-hover:bg-accent-500 transition-colors">
                      <FiActivity className="w-6 h-6 text-accent-600 group-hover:text-white transition-colors" />
                    </div>
                    {service.discount?.percentage > 0 && (
                      <span className="px-2.5 py-1 rounded-full bg-success-light text-success-dark text-xs font-semibold">
                        {service.discount.percentage}% OFF
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-semibold text-primary-900 mb-2 group-hover:text-accent-600 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-primary-500 text-sm mb-4 flex-1 line-clamp-2">
                    {service.description}
                  </p>

                  <div className="flex items-center gap-2 text-sm text-primary-400 mb-4">
                    <FiClock className="w-4 h-4" />
                    <span>{service.duration} minutes</span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-primary-100">
                    <div>
                      {service.discount?.percentage > 0 ? (
                        <>
                          <span className="text-2xl font-bold text-primary-900">
                            ₹{Math.round(service.basePrice * (1 - service.discount.percentage / 100))}
                          </span>
                          <span className="text-sm text-primary-400 line-through ml-2">
                            ₹{service.basePrice}
                          </span>
                        </>
                      ) : (
                        <span className="text-2xl font-bold text-primary-900">₹{service.basePrice}</span>
                      )}
                    </div>
                    <Link to={user ? `/booking/${service._id}` : '/login'}>
                      <Button variant="primary" size="sm" icon={FiArrowRight} iconPosition="right">
                        Book
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-8 text-center text-sm text-primary-500">
              Showing {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Services
