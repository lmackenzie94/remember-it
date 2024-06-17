import { Button } from '@/components/ui/button';
import { createServerClient } from '@/utils/supabase/server';
import { signOut } from '@/utils/supabase/server/queries';

export default async function Footer() {
  const handleSignOut = async () => {
    'use server';
    await signOut();
  };

  const supabase = createServerClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  return (
    <footer className="w-full p-4 text-center">
      <div className="container flex items-center justify-end">
        {user && (
          <form action={handleSignOut}>
            <Button variant="secondary">Logout</Button>
          </form>
        )}
      </div>
    </footer>
  );
}
