import { signOut } from '@/utils/supabase/server/queries';

export default function Footer({ user }: { user: any }) {
  const handleSignOut = async () => {
    'use server';
    await signOut();
  };

  if (!user) return null;

  return (
    <footer className="w-full p-4 text-center bg-gray-800">
      <div className="container flex items-center justify-end">
        <form action={handleSignOut}>
          <button className="px-4 py-2 font-semibold no-underline rounded-md bg-btn-background hover:bg-btn-background-hover">
            Logout
          </button>
        </form>
      </div>
    </footer>
  );
}
