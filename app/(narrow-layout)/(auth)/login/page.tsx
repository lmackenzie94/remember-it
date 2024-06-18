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
    <div className="flex flex-col justify-center flex-1 w-full gap-2 p-6 rounded-2xl">
      <H2>Sign In</H2>
      <form
        action={login}
        className="flex flex-col justify-center flex-1 w-full gap-2 animate-fade-up-in"
      >
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="px-4 py-2 mb-6 border rounded-md bg-inherit"
          name="email"
          placeholder="you@example.com"
          required
        />
        <label className="text-md" htmlFor="password">
          Password
        </label>
        <input
          className="px-4 py-2 mb-6 border rounded-md bg-inherit"
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
    </div>
  );
}
