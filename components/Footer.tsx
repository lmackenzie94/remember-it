import { signOut } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { createServerClient } from '@/utils/supabase/server';

export default async function Footer() {
  const supabase = createServerClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  return (
    <footer className="w-full p-4 text-center mt-4">
      <div className="container flex items-center justify-end">
        {user && (
          <form action={signOut}>
            <Button variant="secondary">Logout</Button>
          </form>
        )}
      </div>
    </footer>
  );
}
