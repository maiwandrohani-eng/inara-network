"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { LogOut, User, ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const menu = [
  {
    label: 'Home',
    href: '/',
    icon: '🏠',
    home: true,
  },
  {
    label: 'Organizations',
    href: '/organizations',
  },
  {
    label: 'Projects',
    href: '/projects',
  },
  {
    label: 'Resources',
    href: '/resources',
  },
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
    ],
  },
  {
    label: 'Analytics',
    href: '/analytics',
  },
];


export default function Sidebar() {
  const { data: session } = useSession();
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

    return (
      <>
        <aside className="fixed top-0 left-0 h-screen w-64 bg-gradient-to-b from-white via-gray-50 to-gray-100 shadow-2xl z-50 flex flex-col rounded-r-2xl border-r border-gray-200">
          <div className="flex flex-col items-center gap-2 px-6 py-6 border-b">
            <Link href="/" className="flex items-center gap-2 w-full justify-center">
              <Image src="/images/inara-logo.png" alt="INARA" width={40} height={40} className="object-contain" />
              <span className="text-2xl font-extrabold text-primary-700 tracking-wide">Home</span>
            </Link>
            <span className="text-lg font-bold text-gray-900 mt-2">INARA Network</span>
          </div>
        </aside>
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <div className="mb-4 text-xs font-bold text-gray-400 uppercase tracking-wide pl-2">Main</div>
          <ul className="space-y-1 mb-6">
            {menu.filter(item => !item.home && !item.children && item.href).map(item => (
              <li key={item.label}>
                {item.href ? (
                  <Link href={item.href} className="flex items-center text-gray-700 hover:bg-primary-50 hover:text-primary-700 font-semibold px-3 py-2 rounded-lg transition-all">
                    {item.icon ? <span className="mr-2">{item.icon}</span> : null}{item.label}
                  </Link>
                ) : null}
              </li>
            ))}
          </ul>
          <div className="mb-4 text-xs font-bold text-gray-400 uppercase tracking-wide pl-2">Programs</div>
          <ul className="space-y-1">
            {menu.filter(item => Array.isArray(item.children) && item.children.length > 0).map(item => (
              <li key={item.label} className="rounded-lg bg-gray-50 border border-gray-200">
                <button
                  className="flex items-center w-full text-left text-gray-700 hover:bg-primary-50 hover:text-primary-700 font-semibold gap-2 px-3 py-2 rounded-lg focus:outline-none transition-all"
                  onClick={() => toggleMenu(item.label)}
                  aria-expanded={openMenus[item.label]}
                >
                  {item.label}
                  <span className={`transition-transform duration-200 ${openMenus[item.label] ? 'rotate-180' : ''}`}>{openMenus[item.label] ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}</span>
                </button>
                <ul className={`ml-4 mt-2 space-y-1 overflow-hidden transition-all duration-300 ${openMenus[item.label] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  {Array.isArray(item.children) && item.children.map((sub) => (
                    <li key={sub.label}>
                      <Link href={sub.href} className="text-gray-600 hover:bg-primary-50 hover:text-primary-700 block px-2 py-1 rounded transition-all">
                        {sub.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </nav>
        <div className="px-6 py-4 border-t flex flex-col gap-2 bg-gray-50 rounded-b-2xl">
          {/* User actions, profile, etc. can go here */}
        </div>
      </>
    );
  }
