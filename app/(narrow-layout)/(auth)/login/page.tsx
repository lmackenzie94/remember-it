import { createServerClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { SubmitButton } from '../_components/SubmitButton';
import { H2 } from '@/components/typography';
import { login } from '@/app/actions';

export default async function Login({
  searchParams
}: {
  searchParams: { message: string };
}) {
  // if user is already logged in, redirect to the home page
  const supabase = createServerClient();
  const { data, error } = await supabase.auth.getUser();
  if (data?.user) {
    return redirect('/');
  }

  return (
    <>
      <H2>Sign In</H2>
      <form
        action={login}
        className="flex flex-col gap-1 animate-fade-up-in bg-green/10 dark:bg-green/30 p-5 rounded-md max-w-lg mx-auto"
      >
        <label className="text-sm" htmlFor="email">
          Email
        </label>
        <input
          className="px-4 py-2 mb-5 border rounded-md bg-white text-black"
          name="email"
          placeholder="you@example.com"
          required
        />
        <label className="text-sm" htmlFor="password">
          Password
        </label>
        <input
          className="px-4 py-2 mb-5 border rounded-md bg-white text-black"
          type="password"
          name="password"
          required
        />

        <SubmitButton variant="green" pendingText="Signing In...">
          Sign In
        </SubmitButton>

        {searchParams?.message && (
          <p className="p-4 mt-4 text-center bg-foreground/10 text-foreground">
            {searchParams.message}
          </p>
        )}
      </form>
    </>
  );
}
