'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Building2, MapPin, Users, ExternalLink } from 'lucide-react'

interface Organization {
  id: string
  name: string
  slug: string
  type: string
  country: string
  city?: string
  description?: string
  logo?: string
  verified: boolean
  _count: {
    projects: number
    resources: number
    users: number
  }
}

export default function OrganizationsPage() {
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    type: '',
    country: '',
    status: 'ACTIVE',
  })

  useEffect(() => {
    fetchOrganizations()
  }, [filters])

  const fetchOrganizations = async () => {
    setLoading(true)
    const queryParams = new URLSearchParams()
    if (filters.type) queryParams.append('type', filters.type)
    if (filters.country) queryParams.append('country', filters.country)
    if (filters.status) queryParams.append('status', filters.status)

    const res = await fetch(`/api/organizations?${queryParams}`)
    const data = await res.json()
    setOrganizations(data.organizations)
    setLoading(false)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Humanitarian Organizations</h1>
        <p className="text-gray-600">
          Discover and connect with verified humanitarian organizations in the INARA Network
        </p>
      </div>

      {/* Filters */}
      <div className="card mb-8">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="label">Organization Type</label>
            <select
              className="input"
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            >
              <option value="">All Types</option>
              <option value="NGO">NGO</option>
              <option value="INGO">INGO</option>
              <option value="UN_AGENCY">UN Agency</option>
              <option value="GOVERNMENT">Government</option>
              <option value="FAITH_BASED">Faith-Based</option>
              <option value="COMMUNITY">Community</option>
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
            <label className="label">Status</label>
            <select
              className="input"
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            >
              <option value="ACTIVE">Active</option>
              <option value="PENDING">Pending</option>
              <option value="ALL">All</option>
            </select>
          </div>
        </div>
      </div>

      {/* Organizations Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {organizations.map((org) => (
            <OrganizationCard key={org.id} organization={org} />
          ))}
        </div>
      )}

      {organizations.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-500">No organizations found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}

function OrganizationCard({ organization }: { organization: Organization }) {
  return (
    <Link href={`/organizations/${organization.slug}`}>
      <div className="card hover:shadow-xl transition-shadow cursor-pointer h-full">
        <div className="flex items-start gap-4 mb-4">
          {organization.logo ? (
            <img src={organization.logo} alt={organization.name} className="w-16 h-16 rounded-lg object-cover" />
          ) : (
            <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-8 h-8 text-primary-600" />
            </div>
          )}
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1">{organization.name}</h3>
            <span className="inline-block px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded">
              {organization.type.replace('_', ' ')}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-gray-600 text-sm mb-3">
          <MapPin className="w-4 h-4" />
          <span>{organization.city ? `${organization.city}, ` : ''}{organization.country}</span>
        </div>
        
        {organization.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {organization.description}
          </p>
        )}
        
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex gap-4 text-sm text-gray-600">
            <span>{organization._count.projects} projects</span>
            <span>{organization._count.users} members</span>
          </div>
          <ExternalLink className="w-4 h-4 text-primary-600" />
        </div>
      </div>
    </Link>
  )
}
