'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FolderOpen, MapPin, Calendar, Users, TrendingUp } from 'lucide-react'
import { format } from 'date-fns'

interface Project {
  id: string
  title: string
  slug: string
  shortDescription?: string
  type: string
  status: string
  priority: string
  country: string
  region?: string
  startDate?: string
  targetBeneficiaries?: number
  currentBeneficiaries?: number
  sectors: string[]
  organization: {
    id: string
    name: string
    logo?: string
  }
  _count: {
    members: number
    resources: number
    updates: number
  }
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    type: '',
    status: 'ACTIVE',
    country: '',
  })

  useEffect(() => {
    fetchProjects()
  }, [filters])

  const fetchProjects = async () => {
    setLoading(true)
    const queryParams = new URLSearchParams()
    if (filters.type) queryParams.append('type', filters.type)
    if (filters.status) queryParams.append('status', filters.status)
    if (filters.country) queryParams.append('country', filters.country)

    const res = await fetch(`/api/projects?${queryParams}`)
    const data = await res.json()
    setProjects(data.projects)
    setLoading(false)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Relief & Aid Projects</h1>
        <p className="text-gray-600">
          Explore ongoing and planned humanitarian projects across the network
        </p>
      </div>

      {/* Filters */}
      <div className="card mb-8">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="label">Project Type</label>
            <select
              className="input"
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            >
              <option value="">All Types</option>
              <option value="EMERGENCY_RESPONSE">Emergency Response</option>
              <option value="DEVELOPMENT">Development</option>
              <option value="ADVOCACY">Advocacy</option>
              <option value="CAPACITY_BUILDING">Capacity Building</option>
              <option value="RESEARCH">Research</option>
            </select>
          </div>
          <div>
            <label className="label">Status</label>
            <select
              className="input"
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            >
              <option value="">All Statuses</option>
              <option value="PLANNING">Planning</option>
              <option value="ACTIVE">Active</option>
              <option value="COMPLETED">Completed</option>
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
        </div>
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}

      {projects.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-500">No projects found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const priorityColors = {
    CRITICAL: 'bg-red-100 text-red-700',
    HIGH: 'bg-orange-100 text-orange-700',
    MEDIUM: 'bg-yellow-100 text-yellow-700',
    LOW: 'bg-green-100 text-green-700',
  }

  const statusColors = {
    PLANNING: 'bg-blue-100 text-blue-700',
    ACTIVE: 'bg-green-100 text-green-700',
    ON_HOLD: 'bg-yellow-100 text-yellow-700',
    COMPLETED: 'bg-gray-100 text-gray-700',
    CANCELLED: 'bg-red-100 text-red-700',
  }

  return (
    <Link href={`/projects/${project.slug}`}>
      <div className="card hover:shadow-xl transition-shadow cursor-pointer h-full">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-semibold text-xl mb-2">{project.title}</h3>
            <div className="flex gap-2 mb-3">
              <span className={`px-2 py-1 text-xs rounded ${priorityColors[project.priority as keyof typeof priorityColors]}`}>
                {project.priority}
              </span>
              <span className={`px-2 py-1 text-xs rounded ${statusColors[project.status as keyof typeof statusColors]}`}>
                {project.status}
              </span>
            </div>
          </div>
          <FolderOpen className="w-8 h-8 text-primary-600" />
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <MapPin className="w-4 h-4" />
            <span>{project.region ? `${project.region}, ` : ''}{project.country}</span>
          </div>
          {project.startDate && (
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <Calendar className="w-4 h-4" />
              <span>Started {format(new Date(project.startDate), 'MMM yyyy')}</span>
            </div>
          )}
          {project.targetBeneficiaries && (
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <Users className="w-4 h-4" />
              <span>{project.currentBeneficiaries || 0} / {project.targetBeneficiaries} beneficiaries</span>
            </div>
          )}
        </div>

        {project.shortDescription && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {project.shortDescription}
          </p>
        )}

        <div className="flex flex-wrap gap-2 mb-4">
          {project.sectors.slice(0, 3).map((sector) => (
            <span key={sector} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
              {sector}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center gap-2">
            {project.organization.logo ? (
              <img src={project.organization.logo} alt={project.organization.name} className="w-6 h-6 rounded" />
            ) : (
              <div className="w-6 h-6 bg-primary-100 rounded"></div>
            )}
            <span className="text-sm text-gray-600">{project.organization.name}</span>
          </div>
          <span className="text-sm text-gray-600">{project._count.members} team members</span>
        </div>
      </div>
    </Link>
  )
}
