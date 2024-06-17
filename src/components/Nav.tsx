'use client';

import { Profile } from '@/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavLinks = [
  { href: '/questions', label: 'All' },
  { href: '/new-question', label: 'New' }
];

const isLetterOrNumber = (char: string) => /[a-zA-Z0-9]/.test(char);

const Avatar = (props: { displayName: string }) => {
  const initials = props.displayName
    ? props.displayName
        .split(' ')
        .map(name => (isLetterOrNumber(name[0]) ? name[0].toUpperCase() : null))
        .join('')
    : '??';

  return (
    <div className="flex items-center justify-center text-sm font-bold text-accent-foreground bg-accent rounded-full w-9 h-9 hover:scale-110 transition-transform">
      {initials}
    </div>
  );
};

export default function Nav({ profile }: { profile: Profile }) {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-8">
      {NavLinks.map(({ href, label }) => {
        const isActive = pathname === href;

        return (
          <Link key={href} href={href} className={isActive ? 'font-bold' : ''}>
            {label}
          </Link>
        );
      })}
      <Link href="/me">
        <Avatar displayName={profile.display_name} />
      </Link>
    </nav>
  );
}
