"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { LogOut, User, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const menu = [
  { label: 'Home', href: '/' },
  { label: 'Organizations', href: '/organizations' },
  { label: 'Projects', href: '/projects' },
  { label: 'Resources', href: '/resources' },
  { label: 'Become a Member', href: '/become-member' },
  {
    label: 'Programs',
    children: [
      { label: 'Services', href: '/services' },
      { label: 'Trainings', href: '/trainings' },
      { label: 'Events', href: '/events' },
      { label: 'Funding', href: '/funding' },
      { label: 'Documents', href: '/documents' },
      { label: 'Forums', href: '/forums' },
      { label: 'Benefits', href: '/benefits' },
      { label: 'Regions', href: '/regions' },
      { label: 'Assessments', href: '/assessments' },
      { label: 'Analytics', href: '/analytics' },
    ],
  },
];

export default function TopMenuBar() {
  const { data: session } = useSession();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <nav className="container mx-auto px-4 flex items-center justify-between h-20">
        <div className="flex items-center gap-3">
          <Image src="/images/inara-logo.png" alt="INARA" width={64} height={64} className="object-contain" />
          <span className="text-2xl font-extrabold text-primary-700 leading-tight">INARA<br /><span className="font-bold">Network</span></span>
        </div>
        <div className="flex-1 flex justify-center">
          <ul className="flex items-center gap-8">
            {menu.map((item) =>
              item.children ? (
                <li key={item.label} className="relative">
                  <button
                    className="flex items-center gap-1 text-gray-700 hover:text-primary-700 font-semibold px-3 py-2 rounded-lg transition-all"
                    onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                    aria-expanded={openDropdown === item.label}
                  >
                    {item.label}
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </button>
                  {openDropdown === item.label && (
                    <ul className="absolute left-0 mt-2 bg-white shadow-lg rounded-lg py-2 w-56 z-50">
                      {item.children.map((sub) => (
                        <li key={sub.label}>
                          <Link href={sub.href} className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-700 rounded transition-all" onClick={() => setOpenDropdown(null)}>
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={item.label}>
                  <Link href={item.href} className="text-gray-700 hover:text-primary-700 font-semibold px-3 py-2 rounded-lg transition-all">
                    {item.label}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>
        <div className="flex items-center gap-6">
          {session ? (
            <>
              <Link href="/dashboard" className="text-gray-700 hover:text-primary-700 font-semibold px-3 py-2 rounded-lg">Dashboard</Link>
              {((session?.user as any)?.role === 'ADMIN' || (session?.user as any)?.role === 'SUPER_ADMIN') && (
                <Link href="/admin" className="text-primary-700 hover:text-primary-800 font-semibold px-3 py-2 rounded-lg">Admin Panel</Link>
              )}
              <div className="flex flex-col items-end">
                <Link href="/profile" className="flex items-center gap-2 text-gray-700 hover:text-primary-700 px-3 py-2 rounded-lg">
                  <User className="w-5 h-5" />
                  <span>{session.user?.name}</span>
                </Link>
                <button
                  onClick={() => signOut()}
                  className="flex items-center gap-2 text-gray-700 hover:text-red-600 px-3 py-2 rounded-lg"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            </>
          ) : (
            <>
              <Link href="/auth/signin" className="text-primary-700 hover:text-primary-800 font-semibold px-3 py-2 rounded-lg">Sign In</Link>
              <Link href="/auth/signup" className="btn btn-primary ml-2">Join Network</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
