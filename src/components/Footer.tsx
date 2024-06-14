import { Button } from '@/components/ui/button';
import { signOut } from '@/utils/supabase/server/queries';

export default function Footer({ user }: { user: any }) {
  const handleSignOut = async () => {
    'use server';
    await signOut();
  };

  if (!user) return null;

  return (
    <footer className="w-full p-4 text-center">
      <div className="container flex items-center justify-end">
        <form action={handleSignOut}>
          <Button variant="secondary">Logout</Button>
        </form>
      </div>
    </footer>
  );
}
