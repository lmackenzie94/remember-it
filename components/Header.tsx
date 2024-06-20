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
  let userDisplayName;
  if (!user) {
    navToShow = <AuthNav />;
  } else {
    const profile = await getUserProfile(user.id);
    userDisplayName = profile.display_name;
    navToShow = <Nav />;
  }

  return (
    <header className="bg-accent text-accent-foreground w-full mb-14">
      <div className="container">
        <div className="flex flex-col sm:flex-row justify-center items-center sm:justify-between py-4 sm:py-8">
          <h1 className="font-mono text-xl sm:text-2xl tracking-wide font-black mb-3 pb-3 sm:mb-0 sm:pb-0 border-b-2 sm:border-0 border-background w-full sm:w-auto text-center">
            <Link href="/">Remember It</Link>
          </h1>

          <div className="flex justify-between sm:justify-end w-full sm:w-auto">
            {navToShow}
            <div className="flex gap-x-2">
              {user && userDisplayName && (
                <Link href="/me" className="mr-2 ml-14">
                  <Avatar displayName={userDisplayName} />
                </Link>
              )}
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

const isLetterOrNumber = (char: string) => /[a-zA-Z0-9]/.test(char);

const Avatar = (props: { displayName: string }) => {
  const initials = props.displayName
    ? props.displayName
        .split(' ')
        .map(name => (isLetterOrNumber(name[0]) ? name[0].toUpperCase() : null))
        .join('')
    : '??';

  return (
    <div className="flex items-center justify-center text-sm font-bold text-accent bg-accent-foreground rounded-full w-9 h-9 hover:scale-110 transition-transform">
      {initials}
    </div>
  );
};
