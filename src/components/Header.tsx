import Link from 'next/link';
import Nav from './Nav';
import AuthNav from './AuthNav';

export default async function Header({ user }: { user: any }) {
  return (
    <header className="w-full py-6 tracking-wide bg-gray-800 mb-14">
      <div className="container flex items-center justify-between">
        <h1 className="font-mono text-2xl text-pink-300">
          <Link href="/">Remember It</Link>
        </h1>

        {user ? <Nav user={user} /> : <AuthNav />}
      </div>
    </header>
  );
}
