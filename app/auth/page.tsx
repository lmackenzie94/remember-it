import { AuthTabs } from '@/components/AuthTabs';
import { createServerClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function AuthPage({
  searchParams
}: {
  searchParams: { message: string };
}) {
  // if user is already logged in, redirect to the home page
  const supabase = createServerClient();
  const { data } = await supabase.auth.getUser();
  if (data?.user) {
    return redirect('/');
  }

  return (
    <>
      <AuthTabs />
      {searchParams?.message && (
        <p className="p-2 mt-4 text-center outline outline-2 outline-destructive bg-destructive/15 text-foreground rounded-md max-w-lg mx-auto">
          {searchParams.message}
        </p>
      )}
    </>
  );
}
