'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'
import { BarChart, Users, FolderOpen, Package, TrendingUp, AlertCircle } from 'lucide-react'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const [stats, setStats] = useState({
    organizations: 0,
    projects: 0,
    resources: 0,
    activities: 0,
  })

  if (status === 'unauthenticated') {
    redirect('/auth/signin')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back, {session?.user?.name}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Organizations"
          value={stats.organizations}
          icon={<Users className="w-8 h-8" />}
          color="blue"
        />
        <StatCard
          title="Active Projects"
          value={stats.projects}
          icon={<FolderOpen className="w-8 h-8" />}
          color="green"
        />
        <StatCard
          title="Available Resources"
          value={stats.resources}
          icon={<Package className="w-8 h-8" />}
          color="purple"
        />
        <StatCard
          title="Network Activity"
          value={stats.activities}
          icon={<TrendingUp className="w-8 h-8" />}
          color="orange"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="card">
          <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="btn btn-primary w-full text-left">
              Create New Project
            </button>
            <button className="btn btn-secondary w-full text-left">
              Add Resource
            </button>
            <button className="btn btn-secondary w-full text-left">
              Find Partners
            </button>
          </div>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold mb-4">Recent Alerts</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Emergency Response Needed</p>
                <p className="text-xs text-gray-600">Haiti - Hurricane aftermath</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Coordination Meeting</p>
                <p className="text-xs text-gray-600">Tomorrow at 10:00 AM UTC</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <ActivityItem
            title="New organization joined"
            description="International Medical Corps"
            time="2 hours ago"
          />
          <ActivityItem
            title="Project updated"
            description="Emergency shelter distribution in Yemen"
            time="5 hours ago"
          />
          <ActivityItem
            title="Resource added"
            description="Medical supplies available in Jordan"
            time="1 day ago"
          />
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value, icon, color }: any) {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600',
  }

  return (
    <div className="card">
      <div className={`inline-block p-3 rounded-lg mb-4 ${colorClasses[color as keyof typeof colorClasses]}`}>
        {icon}
      </div>
      <h3 className="text-gray-600 text-sm mb-1">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  )
}

function ActivityItem({ title, description, time }: any) {
  return (
    <div className="flex items-start justify-between py-3 border-b last:border-0">
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <span className="text-xs text-gray-500">{time}</span>
    </div>
  )
}
