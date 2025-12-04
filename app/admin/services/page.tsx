'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react'

export default function ServicesManagementPage() {
  const { data: session, status } = useSession()
  const [services, setServices] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('ALL')
  const [showModal, setShowModal] = useState(false)
  const [editingService, setEditingService] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'TECHNICAL_ASSISTANCE',
    eligibility: 'ALL',
    deliveryMethod: 'ONLINE',
    duration: '',
    cost: 0,
    active: true,
  })

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/services')
      if (res.ok) {
        const data = await res.json()
        setServices(data.services)
      }
    } catch (error) {
      console.error('Error fetching services:', error)
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!session) {
    redirect('/auth/signin')
  }

  // @ts-ignore
  const userRole = session?.user?.role
  if (userRole !== 'ADMIN' && userRole !== 'SUPER_ADMIN') {
    redirect('/dashboard')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const url = editingService
        ? `/api/services/${editingService.id}`
        : '/api/services'
      
      const res = await fetch(url, {
        method: editingService ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        fetchServices()
        setShowModal(false)
        setEditingService(null)
        setFormData({
          name: '',
          description: '',
          category: 'TECHNICAL_ASSISTANCE',
          eligibility: 'ALL',
          deliveryMethod: 'ONLINE',
          duration: '',
          cost: 0,
          active: true,
        })
      }
    } catch (error) {
      console.error('Error saving service:', error)
    }
  }

  const handleEdit = (service: any) => {
    setEditingService(service)
    setFormData({
      name: service.name,
      description: service.description || '',
      category: service.category,
      eligibility: service.eligibility || 'ALL',
      deliveryMethod: service.deliveryMethod || 'ONLINE',
      duration: service.duration || '',
      cost: service.cost || 0,
      active: service.active,
    })
    setShowModal(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return
    
    try {
      const res = await fetch(`/api/services/${id}`, {
        method: 'DELETE'
      })
      if (res.ok) {
        fetchServices()
      }
    } catch (error) {
      console.error('Error deleting service:', error)
    }
  }

  const filteredServices = services.filter((service: any) => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'ALL' || service.category === filterCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Services Management</h1>
          <p className="text-gray-600">Manage services provided to network members</p>
        </div>
        <button 
          onClick={() => {
            setEditingService(null)
            setShowModal(true)
          }}
          className="btn btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Service
        </button>
      </div>

      {/* Filters */}
      <div className="card mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                className="input pl-10 w-full"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <select
            className="input"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="ALL">All Categories</option>
            <option value="TECHNICAL_ASSISTANCE">Technical Assistance</option>
            <option value="CONSULTING">Consulting</option>
            <option value="TRAINING">Training</option>
            <option value="CAPACITY_BUILDING">Capacity Building</option>
            <option value="GRANT_MANAGEMENT">Grant Management</option>
            <option value="MONITORING_EVALUATION">Monitoring & Evaluation</option>
            <option value="FINANCIAL_MANAGEMENT">Financial Management</option>
            <option value="LEGAL_SUPPORT">Legal Support</option>
            <option value="NETWORKING">Networking</option>
            <option value="RESEARCH">Research</option>
            <option value="ADVOCACY">Advocacy</option>
            <option value="OTHER">Other</option>
          </select>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service: any) => (
          <div key={service.id} className="card hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                <span className="text-xs px-2 py-1 bg-primary-100 text-primary-700 rounded-full">
                  {service.category.replace(/_/g, ' ')}
                </span>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs ${
                service.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
              }`}>
                {service.active ? 'Active' : 'Inactive'}
              </div>
            </div>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {service.description}
            </p>

            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <span>Eligibility: {service.eligibility || 'ALL'}</span>
              {service.cost > 0 && <span className="font-semibold">${service.cost}</span>}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(service)}
                className="flex-1 btn btn-secondary text-sm flex items-center justify-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={() => handleDelete(service.id)}
                className="px-4 btn bg-red-50 text-red-600 hover:bg-red-100 text-sm"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">
                {editingService ? 'Edit Service' : 'Add New Service'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="label">Service Name *</label>
                  <input
                    type="text"
                    className="input w-full"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="label">Description *</label>
                  <textarea
                    className="input w-full"
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="label">Category *</label>
                    <select
                      className="input w-full"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      required
                    >
                      <option value="TECHNICAL_ASSISTANCE">Technical Assistance</option>
                      <option value="CONSULTING">Consulting</option>
                      <option value="TRAINING">Training</option>
                      <option value="CAPACITY_BUILDING">Capacity Building</option>
                      <option value="GRANT_MANAGEMENT">Grant Management</option>
                      <option value="MONITORING_EVALUATION">Monitoring & Evaluation</option>
                      <option value="FINANCIAL_MANAGEMENT">Financial Management</option>
                      <option value="LEGAL_SUPPORT">Legal Support</option>
                      <option value="NETWORKING">Networking</option>
                      <option value="RESEARCH">Research</option>
                      <option value="ADVOCACY">Advocacy</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="label">Eligibility</label>
                    <select
                      className="input w-full"
                      value={formData.eligibility}
                      onChange={(e) => setFormData({ ...formData, eligibility: e.target.value })}
                    >
                      <option value="ALL">All Members</option>
                      <option value="CORE">Core Members</option>
                      <option value="FULL">Full Members</option>
                      <option value="ASSOCIATE">Associate Members</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="label">Delivery Method</label>
                    <select
                      className="input w-full"
                      value={formData.deliveryMethod}
                      onChange={(e) => setFormData({ ...formData, deliveryMethod: e.target.value })}
                    >
                      <option value="ONLINE">Online</option>
                      <option value="IN_PERSON">In Person</option>
                      <option value="HYBRID">Hybrid</option>
                    </select>
                  </div>

                  <div>
                    <label className="label">Duration</label>
                    <input
                      type="text"
                      className="input w-full"
                      placeholder="e.g., 2 weeks"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="label">Cost ($)</label>
                    <input
                      type="number"
                      className="input w-full"
                      value={formData.cost}
                      onChange={(e) => setFormData({ ...formData, cost: Number(e.target.value) })}
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="label">Status</label>
                    <select
                      className="input w-full"
                      value={formData.active ? 'true' : 'false'}
                      onChange={(e) => setFormData({ ...formData, active: e.target.value === 'true' })}
                    >
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button type="submit" className="btn btn-primary flex-1">
                    {editingService ? 'Update Service' : 'Create Service'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false)
                      setEditingService(null)
                    }}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
