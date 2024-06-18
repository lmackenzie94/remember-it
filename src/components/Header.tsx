import Link from 'next/link';
import Nav from './Nav';
import AuthNav from './AuthNav';
import { ThemeToggle } from './ThemeToggle';
import { getUserProfile } from '@/utils/supabase/queries';
import { createServerClient } from '@/utils/supabase/server';

export default async function Header() {
  const supabase = createServerClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  let navToShow;
  if (!user) {
    navToShow = <AuthNav />;
  } else {
    const profile = await getUserProfile(user.id);
    navToShow = <Nav profile={profile} />;
  }

  return (
    <header className="container mb-14">
      <div className="flex items-center justify-between border-b py-8">
        <h1 className="font-mono text-2xl tracking-wide font-black">
          <Link href="/">Remember It</Link>
        </h1>

        <div className="flex gap-x-5">
          {navToShow}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
