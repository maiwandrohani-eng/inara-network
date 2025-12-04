'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import {
  Users,
  FileText,
  Calendar,
  Package,
  DollarSign,
  BookOpen,
  MessageSquare,
  Settings,
  Award,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react'
import { useEffect, useState } from 'react'

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const [stats, setStats] = useState({
    pendingApplications: 0,
    activeMembers: 0,
    upcomingEvents: 0,
    activeServices: 0,
    openFunding: 0,
    documents: 0,
  })

  useEffect(() => {
    // Fetch admin statistics
    const fetchStats = async () => {
      // API calls to get stats
      // This is a placeholder
      setStats({
        pendingApplications: 12,
        activeMembers: 245,
        upcomingEvents: 8,
        activeServices: 15,
        openFunding: 23,
        documents: 156,
      })
    }
    fetchStats()
  }, [])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    redirect('/auth/signin')
  }

  // @ts-ignore - NextAuth types
  const userRole = session?.user?.role
  if (userRole !== 'ADMIN' && userRole !== 'SUPER_ADMIN') {
    redirect('/dashboard')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Admin Panel</h1>
        <p className="text-gray-600">Manage all aspects of the INARA Network</p>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Pending Applications"
          value={stats.pendingApplications}
          icon={<Clock className="w-6 h-6" />}
          color="orange"
          link="/admin/applications"
        />
        <StatCard
          title="Active Members"
          value={stats.activeMembers}
          icon={<Users className="w-6 h-6" />}
          color="blue"
          link="/admin/members"
        />
        <StatCard
          title="Upcoming Events"
          value={stats.upcomingEvents}
          icon={<Calendar className="w-6 h-6" />}
          color="green"
          link="/admin/events"
        />
        <StatCard
          title="Active Services"
          value={stats.activeServices}
          icon={<Package className="w-6 h-6" />}
          color="purple"
          link="/admin/services"
        />
      </div>

      {/* Management Sections */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AdminCard
          title="Applications"
          description="Review and approve membership applications"
          icon={<FileText className="w-8 h-8" />}
          link="/admin/applications"
          badge={stats.pendingApplications}
        />
        <AdminCard
          title="Members & Organizations"
          description="Manage member profiles and organizations"
          icon={<Users className="w-8 h-8" />}
          link="/admin/members"
        />
        <AdminCard
          title="Services"
          description="Manage services provided to members"
          icon={<Package className="w-8 h-8" />}
          link="/admin/services"
        />
        <AdminCard
          title="Training Programs"
          description="Create and manage capacity building programs"
          icon={<Award className="w-8 h-8" />}
          link="/admin/training"
        />
        <AdminCard
          title="Funding Opportunities"
          description="Post and manage funding opportunities"
          icon={<DollarSign className="w-8 h-8" />}
          link="/admin/funding"
          badge={stats.openFunding}
        />
        <AdminCard
          title="Events"
          description="Organize workshops, conferences, and webinars"
          icon={<Calendar className="w-8 h-8" />}
          link="/admin/events"
        />
        <AdminCard
          title="Document Library"
          description="Manage templates, guidelines, and resources"
          icon={<BookOpen className="w-8 h-8" />}
          link="/admin/documents"
        />
        <AdminCard
          title="Forums & Communication"
          description="Manage forums, announcements, and mailing lists"
          icon={<MessageSquare className="w-8 h-8" />}
          link="/admin/forums"
        />
        <AdminCard
          title="Reports & Analytics"
          description="View network statistics and impact reports"
          icon={<TrendingUp className="w-8 h-8" />}
          link="/admin/reports"
        />
        <AdminCard
          title="Benefits & Rewards"
          description="Manage member benefits and certificates"
          icon={<Award className="w-8 h-8" />}
          link="/admin/benefits"
        />
        <AdminCard
          title="Regional Coordination"
          description="Manage regions and coordination meetings"
          icon={<Users className="w-8 h-8" />}
          link="/admin/regions"
        />
        <AdminCard
          title="Settings"
          description="Platform settings and configuration"
          icon={<Settings className="w-8 h-8" />}
          link="/admin/settings"
        />
      </div>

      {/* Recent Activity */}
      <div className="mt-8 card">
        <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
        <div className="space-y-3">
          <ActivityItem
            type="application"
            title="New application submitted"
            description="Health Beyond Borders - NGO from Jordan"
            time="2 hours ago"
          />
          <ActivityItem
            type="approval"
            title="Application approved"
            description="Syrian Relief Network"
            time="5 hours ago"
          />
          <ActivityItem
            type="event"
            title="Event created"
            description="Capacity Building Workshop - Amman"
            time="1 day ago"
          />
          <ActivityItem
            type="funding"
            title="Funding opportunity posted"
            description="USAID Emergency Response Grant"
            time="2 days ago"
          />
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value, icon, color, link }: any) {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600',
  }

  return (
    <Link href={link}>
      <div className="card hover:shadow-lg transition-shadow cursor-pointer">
        <div className={`inline-block p-3 rounded-lg mb-3 ${colorClasses[color as keyof typeof colorClasses]}`}>
          {icon}
        </div>
        <h3 className="text-gray-600 text-sm mb-1">{title}</h3>
        <p className="text-3xl font-bold">{value}</p>
      </div>
    </Link>
  )
}

function AdminCard({ title, description, icon, link, badge }: any) {
  return (
    <Link href={link}>
      <div className="card hover:shadow-xl transition-shadow cursor-pointer relative">
        {badge && (
          <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {badge}
          </span>
        )}
        <div className="text-primary-600 mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </Link>
  )
}

function ActivityItem({ type, title, description, time }: any) {
  const icons = {
    application: <FileText className="w-5 h-5 text-orange-600" />,
    approval: <CheckCircle className="w-5 h-5 text-green-600" />,
    event: <Calendar className="w-5 h-5 text-blue-600" />,
    funding: <DollarSign className="w-5 h-5 text-purple-600" />,
  }

  return (
    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
      {icons[type as keyof typeof icons]}
      <div className="flex-1">
        <p className="font-medium text-sm">{title}</p>
        <p className="text-xs text-gray-600">{description}</p>
      </div>
      <span className="text-xs text-gray-500">{time}</span>
    </div>
  )
}
