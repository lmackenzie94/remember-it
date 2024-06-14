import Link from 'next/link';
import Nav from './Nav';
import AuthNav from './AuthNav';
import { ThemeToggle } from './ThemeToggle';

export default async function Header({ user }: { user: any }) {
  return (
    <header className="container mb-14">
      <div className="flex items-center justify-between border-b py-8">
        <h1 className="font-mono text-2xl tracking-wide font-black">
          <Link href="/">Remember It</Link>
        </h1>

        <div className="flex gap-x-5">
          {user ? <Nav user={user} /> : <AuthNav />}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
