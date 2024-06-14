'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavLinks = [
  { href: '/questions', label: 'All' },
  { href: '/new-question', label: 'New' }
];

const Avatar = (props: { displayName: string }) => {
  const initials = props.displayName
    .split(' ')
    .map(name => name[0].toUpperCase())
    .join('');

  return (
    <div className="flex items-center justify-center text-sm font-bold text-accent-foreground bg-accent rounded-full w-9 h-9">
      {initials}
    </div>
  );
};

export default function Nav({ user }: { user: any }) {
  const pathname = usePathname();
  const displayName = user?.user_metadata.display_name;

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
        <Avatar displayName={displayName} />
      </Link>
    </nav>
  );
}
