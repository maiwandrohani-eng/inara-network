'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Plus, Search, Edit, Trash2, Users, Calendar } from 'lucide-react'

export default function TrainingManagementPage() {
  const { data: session, status } = useSession()
  const [trainings, setTrainings] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('ALL')
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'TECHNICAL',
    type: 'WORKSHOP',
    deliveryMethod: 'ONLINE',
    startDate: '',
    endDate: '',
    capacity: 30,
    cost: 0,
    location: '',
    status: 'UPCOMING',
  })

  useEffect(() => {
    fetchTrainings()
  }, [])

  const fetchTrainings = async () => {
    try {
      const res = await fetch('/api/admin/trainings')
      if (res.ok) {
        const data = await res.json()
        setTrainings(data)
      }
    } catch (error) {
      console.error('Error fetching trainings:', error)
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

  if (!session) redirect('/auth/signin')
  
  // @ts-ignore
  const userRole = session?.user?.role
  if (userRole !== 'ADMIN' && userRole !== 'SUPER_ADMIN') redirect('/dashboard')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/admin/trainings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        fetchTrainings()
        setShowModal(false)
        setFormData({
          title: '',
          description: '',
          category: 'TECHNICAL',
          type: 'WORKSHOP',
          deliveryMethod: 'ONLINE',
          startDate: '',
          endDate: '',
          capacity: 30,
          cost: 0,
          location: '',
          status: 'UPCOMING',
        })
      }
    } catch (error) {
      console.error('Error saving training:', error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Training Programs</h1>
          <p className="text-gray-600">Manage training and capacity building programs</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="btn btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Create Training
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
                placeholder="Search trainings..."
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
            <option value="TECHNICAL">Technical</option>
            <option value="MANAGEMENT">Management</option>
            <option value="FINANCIAL">Financial</option>
            <option value="SAFEGUARDING">Safeguarding</option>
            <option value="MONITORING_EVALUATION">M&E</option>
            <option value="COMMUNICATION">Communication</option>
            <option value="LEADERSHIP">Leadership</option>
            <option value="PROJECT_MANAGEMENT">Project Management</option>
            <option value="FUNDRAISING">Fundraising</option>
            <option value="ADVOCACY">Advocacy</option>
            <option value="HR_MANAGEMENT">HR Management</option>
            <option value="OTHER">Other</option>
          </select>
        </div>
      </div>

      {/* Training Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {trainings.map((training: any) => (
          <div key={training.id} className="card hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">{training.title}</h3>
                <div className="flex gap-2 mb-2">
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                    {training.category}
                  </span>
                  <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
                    {training.type}
                  </span>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${
                training.status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                training.status === 'ONGOING' ? 'bg-blue-100 text-blue-700' :
                training.status === 'UPCOMING' ? 'bg-yellow-100 text-yellow-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {training.status}
              </span>
            </div>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {training.description}
            </p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="w-4 h-4 mr-2" />
                {new Date(training.startDate).toLocaleDateString()} - {new Date(training.endDate).toLocaleDateString()}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Users className="w-4 h-4 mr-2" />
                {training._count?.participants || 0} / {training.capacity} participants
              </div>
              <div className="text-sm text-gray-500">
                {training.deliveryMethod} • {training.location || 'Online'}
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 btn btn-secondary text-sm flex items-center justify-center gap-2">
                <Edit className="w-4 h-4" />
                Edit
              </button>
              <button className="px-4 btn bg-blue-50 text-blue-600 hover:bg-blue-100 text-sm">
                <Users className="w-4 h-4" />
              </button>
              <button className="px-4 btn bg-red-50 text-red-600 hover:bg-red-100 text-sm">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Training Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">Create Training Program</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="label">Training Title *</label>
                  <input
                    type="text"
                    className="input w-full"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="label">Category *</label>
                    <select
                      className="input w-full"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      required
                    >
                      <option value="TECHNICAL">Technical</option>
                      <option value="MANAGEMENT">Management</option>
                      <option value="FINANCIAL">Financial</option>
                      <option value="SAFEGUARDING">Safeguarding</option>
                      <option value="MONITORING_EVALUATION">M&E</option>
                      <option value="COMMUNICATION">Communication</option>
                      <option value="LEADERSHIP">Leadership</option>
                      <option value="PROJECT_MANAGEMENT">Project Management</option>
                      <option value="FUNDRAISING">Fundraising</option>
                      <option value="ADVOCACY">Advocacy</option>
                      <option value="HR_MANAGEMENT">HR Management</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="label">Type *</label>
                    <select
                      className="input w-full"
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      required
                    >
                      <option value="WORKSHOP">Workshop</option>
                      <option value="WEBINAR">Webinar</option>
                      <option value="COURSE">Course</option>
                      <option value="SEMINAR">Seminar</option>
                      <option value="BOOTCAMP">Bootcamp</option>
                      <option value="CONFERENCE">Conference</option>
                    </select>
                  </div>

                  <div>
                    <label className="label">Delivery Method *</label>
                    <select
                      className="input w-full"
                      value={formData.deliveryMethod}
                      onChange={(e) => setFormData({ ...formData, deliveryMethod: e.target.value })}
                      required
                    >
                      <option value="ONLINE">Online</option>
                      <option value="IN_PERSON">In Person</option>
                      <option value="HYBRID">Hybrid</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="label">Start Date *</label>
                    <input
                      type="date"
                      className="input w-full"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="label">End Date *</label>
                    <input
                      type="date"
                      className="input w-full"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="label">Capacity *</label>
                    <input
                      type="number"
                      className="input w-full"
                      value={formData.capacity}
                      onChange={(e) => setFormData({ ...formData, capacity: Number(e.target.value) })}
                      min="1"
                      required
                    />
                  </div>

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
                    <label className="label">Location</label>
                    <input
                      type="text"
                      className="input w-full"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="City, Country"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button type="submit" className="btn btn-primary flex-1">
                    Create Training
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
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
