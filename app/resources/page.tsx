'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Package, MapPin, Building2, Check, X } from 'lucide-react'

interface Resource {
  id: string
  name: string
  description: string
  type: string
  category: string
  quantity?: number
  unit?: string
  available: boolean
  location: string
  country: string
  condition?: string
  organization: {
    id: string
    name: string
    logo?: string
  }
  _count: {
    projects: number
  }
}

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    type: '',
    country: '',
    available: 'true',
  })

  useEffect(() => {
    fetchResources()
  }, [filters])

  const fetchResources = async () => {
    setLoading(true)
    const queryParams = new URLSearchParams()
    if (filters.type) queryParams.append('type', filters.type)
    if (filters.country) queryParams.append('country', filters.country)
    if (filters.available) queryParams.append('available', filters.available)

    const res = await fetch(`/api/resources?${queryParams}`)
    const data = await res.json()
    setResources(data.resources)
    setLoading(false)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Shared Resources</h1>
        <p className="text-gray-600">
          Discover available resources and equipment shared by organizations in the network
        </p>
      </div>

      {/* Filters */}
      <div className="card mb-8">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="label">Resource Type</label>
            <select
              className="input"
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            >
              <option value="">All Types</option>
              <option value="EQUIPMENT">Equipment</option>
              <option value="SUPPLIES">Supplies</option>
              <option value="MEDICINE">Medicine</option>
              <option value="FOOD">Food</option>
              <option value="SHELTER_MATERIALS">Shelter Materials</option>
              <option value="VEHICLES">Vehicles</option>
              <option value="TECHNOLOGY">Technology</option>
              <option value="EXPERTISE">Expertise</option>
              <option value="FUNDING">Funding</option>
              <option value="VOLUNTEERS">Volunteers</option>
            </select>
          </div>
          <div>
            <label className="label">Country</label>
            <input
              type="text"
              className="input"
              placeholder="Filter by country"
              value={filters.country}
              onChange={(e) => setFilters({ ...filters, country: e.target.value })}
            />
          </div>
          <div>
            <label className="label">Availability</label>
            <select
              className="input"
              value={filters.available}
              onChange={(e) => setFilters({ ...filters, available: e.target.value })}
            >
              <option value="true">Available</option>
              <option value="false">Not Available</option>
              <option value="">All</option>
            </select>
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      )}

      {resources.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-500">No resources found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}

function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <div className="card hover:shadow-xl transition-shadow h-full">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Package className="w-5 h-5 text-primary-600" />
            <h3 className="font-semibold text-lg">{resource.name}</h3>
          </div>
          <span className="inline-block px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded">
            {resource.type.replace('_', ' ')}
          </span>
        </div>
        {resource.available ? (
          <div className="flex items-center gap-1 text-green-600 text-sm">
            <Check className="w-4 h-4" />
            <span>Available</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 text-red-600 text-sm">
            <X className="w-4 h-4" />
            <span>Not Available</span>
          </div>
        )}
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {resource.description}
      </p>

      {resource.quantity && (
        <div className="text-sm text-gray-600 mb-2">
          <span className="font-medium">Quantity:</span> {resource.quantity} {resource.unit || 'units'}
        </div>
      )}

      {resource.condition && (
        <div className="text-sm text-gray-600 mb-2">
          <span className="font-medium">Condition:</span> {resource.condition}
        </div>
      )}

      <div className="flex items-center gap-2 text-gray-600 text-sm mb-4">
        <MapPin className="w-4 h-4" />
        <span>{resource.location}, {resource.country}</span>
      </div>

      <div className="flex items-center justify-between pt-4 border-t">
        <div className="flex items-center gap-2">
          {resource.organization.logo ? (
            <img src={resource.organization.logo} alt={resource.organization.name} className="w-6 h-6 rounded" />
          ) : (
            <div className="w-6 h-6 bg-primary-100 rounded flex items-center justify-center">
              <Building2 className="w-4 h-4 text-primary-600" />
            </div>
          )}
          <span className="text-sm text-gray-600">{resource.organization.name}</span>
        </div>
        {resource._count.projects > 0 && (
          <span className="text-xs text-gray-500">Used in {resource._count.projects} projects</span>
        )}
      </div>
    </div>
  )
}
