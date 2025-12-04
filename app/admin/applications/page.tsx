'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { CheckCircle, XCircle, Clock, FileText, Download } from 'lucide-react'

interface Application {
  id: string
  status: string
  stage: string
  createdAt: string
  organization: {
    id: string
    name: string
    type: string
    country: string
    email: string
  }
}

export default function ApplicationsPage() {
  const { data: session, status: sessionStatus } = useSession()
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('SUBMITTED')

  useEffect(() => {
    fetchApplications()
  }, [filter])

  const fetchApplications = async () => {
    setLoading(true)
    const res = await fetch(`/api/applications?status=${filter}`)
    const data = await res.json()
    setApplications(data.applications || [])
    setLoading(false)
  }

  const handleAction = async (id: string, action: string, notes?: string) => {
    const res = await fetch(`/api/applications/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, reviewNotes: notes }),
    })

    if (res.ok) {
      fetchApplications()
    }
  }

  if (sessionStatus === 'loading') {
    return <div>Loading...</div>
  }

  if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
    redirect('/dashboard')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Membership Applications</h1>
        <p className="text-gray-600">Review and approve applications to join the network</p>
      </div>

      {/* Filters */}
      <div className="card mb-6">
        <div className="flex gap-2">
          {['SUBMITTED', 'UNDER_REVIEW', 'APPROVED', 'REJECTED', 'ADDITIONAL_INFO_REQUIRED'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg ${
                filter === status ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Applications List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <ApplicationCard
              key={app.id}
              application={app}
              onAction={handleAction}
            />
          ))}
        </div>
      )}

      {applications.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-500">No applications found with status: {filter}</p>
        </div>
      )}
    </div>
  )
}

function ApplicationCard({ application, onAction }: any) {
  const [showDetails, setShowDetails] = useState(false)
  const [reviewNotes, setReviewNotes] = useState('')

  const statusColors = {
    SUBMITTED: 'bg-blue-100 text-blue-700',
    UNDER_REVIEW: 'bg-yellow-100 text-yellow-700',
    APPROVED: 'bg-green-100 text-green-700',
    REJECTED: 'bg-red-100 text-red-700',
    ADDITIONAL_INFO_REQUIRED: 'bg-orange-100 text-orange-700',
  }

  return (
    <div className="card">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2">{application.organization.name}</h3>
          <div className="flex flex-wrap gap-2 mb-2">
            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded">
              {application.organization.type}
            </span>
            <span className={`px-3 py-1 text-sm rounded ${statusColors[application.status as keyof typeof statusColors]}`}>
              {application.status.replace('_', ' ')}
            </span>
          </div>
          <p className="text-sm text-gray-600">
            {application.organization.country} • {application.organization.email}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Applied: {new Date(application.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      {application.status === 'SUBMITTED' || application.status === 'UNDER_REVIEW' ? (
        <div className="flex gap-3 mt-4">
          <button
            onClick={() => onAction(application.id, 'approve', reviewNotes)}
            className="btn btn-primary flex items-center gap-2"
          >
            <CheckCircle className="w-4 h-4" />
            Approve
          </button>
          <button
            onClick={() => onAction(application.id, 'reject', reviewNotes)}
            className="btn btn-danger flex items-center gap-2"
          >
            <XCircle className="w-4 h-4" />
            Reject
          </button>
          <button
            onClick={() => onAction(application.id, 'request_info', reviewNotes)}
            className="btn btn-secondary flex items-center gap-2"
          >
            <Clock className="w-4 h-4" />
            Request Info
          </button>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="btn btn-secondary flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            {showDetails ? 'Hide' : 'View'} Details
          </button>
        </div>
      ) : null}

      {showDetails && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-2">Application Details</h4>
          <p className="text-sm text-gray-600 mb-2">Stage: {application.stage}</p>
          <div className="mt-3">
            <label className="label">Review Notes</label>
            <textarea
              className="input"
              rows={3}
              placeholder="Add review notes..."
              value={reviewNotes}
              onChange={(e) => setReviewNotes(e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  )
}
