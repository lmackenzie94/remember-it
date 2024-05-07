import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const Avatar = (props: { displayName: string }) => {
  const initials = props.displayName
    .split(' ')
    .map(name => name[0].toUpperCase())
    .join('');

  return (
    <div className="flex items-center justify-center text-base text-white bg-blue-500 rounded-full w-9 h-9">
      {initials}
    </div>
  );
};

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  const signOut = async () => {
    'use server';

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect('/login');
  };

  const displayName = user?.user_metadata.display_name;

  return user ? (
    <div className="flex items-center gap-4">
      <Link href="/questions" className="text-blue-500">
        Questions
      </Link>

      <Link href="/me" className="text-blue-500">
        <Avatar displayName={displayName} />
      </Link>
      <form action={signOut}>
        <button className="px-4 py-2 no-underline rounded-md bg-btn-background hover:bg-btn-background-hover">
          Logout
        </button>
      </form>
      <pre className="text-xs">{user.id}</pre>
    </div>
  ) : (
    <div className="flex gap-2">
      <Link
        href="/login"
        className="flex px-3 py-2 no-underline rounded-md bg-btn-background hover:bg-btn-background-hover"
      >
        Login
      </Link>

      <Link
        href="/signup"
        className="flex px-3 py-2 no-underline rounded-md bg-btn-background hover:bg-btn-background-hover"
      >
        Sign Up
      </Link>
    </div>
  );
}
