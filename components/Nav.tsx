'use client';

import { Profile } from '@/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavLinks = [
  { href: '/questions', label: 'All' },
  { href: '/new-question', label: 'New' }
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between gap-10">
      {NavLinks.map(({ href, label }) => {
        const isActive = pathname === href;

        return (
          <Link key={href} href={href} className={isActive ? 'font-bold' : ''}>
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
