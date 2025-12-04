'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'
import { LogOut, User, Menu } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const { data: session } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-gray-900">
            <Image src="/images/inara-logo.png" alt="INARA" width={48} height={48} className="w-12 h-12 object-contain" />
            <span>INARA Network</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/organizations" className="text-gray-700 hover:text-primary-600">
              Organizations
            </Link>
            <Link href="/projects" className="text-gray-700 hover:text-primary-600">
              Projects
            </Link>
            <Link href="/resources" className="text-gray-700 hover:text-primary-600">
              Resources
            </Link>
            <Link href="/services" className="text-gray-700 hover:text-primary-600">
              Services
            </Link>
            <Link href="/trainings" className="text-gray-700 hover:text-primary-600">
              Trainings
            </Link>
            <Link href="/events" className="text-gray-700 hover:text-primary-600">
              Events
            </Link>
            <Link href="/funding" className="text-gray-700 hover:text-primary-600">
              Funding
            </Link>
            <Link href="/documents" className="text-gray-700 hover:text-primary-600">
              Documents
            </Link>
            <Link href="/forums" className="text-gray-700 hover:text-primary-600">
              Forums
            </Link>
            <Link href="/benefits" className="text-gray-700 hover:text-primary-600">
              Benefits
            </Link>
            <Link href="/regions" className="text-gray-700 hover:text-primary-600">
              Regions
            </Link>
            <Link href="/assessments" className="text-gray-700 hover:text-primary-600">
              Assessments
            </Link>
            <Link href="/analytics" className="text-gray-700 hover:text-primary-600">
              Analytics
            </Link>
            {session ? (
              <>
                <Link href="/dashboard" className="text-gray-700 hover:text-primary-600">
                  Dashboard
                </Link>
                {/* @ts-ignore - NextAuth types */}
                {(session?.user?.role === 'ADMIN' || session?.user?.role === 'SUPER_ADMIN') && (
                  <Link href="/admin" className="text-primary-600 hover:text-primary-700 font-semibold">
                    Admin Panel
                  </Link>
                )}
                <div className="flex items-center gap-3">
                  <Link href="/profile" className="flex items-center gap-2 text-gray-700 hover:text-primary-600">
                    <User className="w-5 h-5" />
                    <span>{session.user?.name}</span>
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="flex items-center gap-2 text-gray-700 hover:text-red-600"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/auth/signin" className="text-gray-700 hover:text-primary-600">
                  Sign In
                </Link>
                <Link href="/auth/signup" className="btn btn-primary">
                  Join Network
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-3">
              <Link href="/organizations" className="text-gray-700 hover:text-primary-600">
                Organizations
              </Link>
              <Link href="/projects" className="text-gray-700 hover:text-primary-600">
                Projects
              </Link>
              <Link href="/resources" className="text-gray-700 hover:text-primary-600">
                Resources
              </Link>
              {session ? (
                <>
                  <Link href="/dashboard" className="text-gray-700 hover:text-primary-600">
                    Dashboard
                  </Link>
                  <Link href="/profile" className="text-gray-700 hover:text-primary-600">
                    Profile
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="text-left text-gray-700 hover:text-red-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth/signin" className="text-gray-700 hover:text-primary-600">
                    Sign In
                  </Link>
                  <Link href="/auth/signup" className="btn btn-primary">
                    Join Network
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
