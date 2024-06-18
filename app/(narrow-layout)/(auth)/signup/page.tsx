import { headers } from 'next/headers';
import { createServerClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { SubmitButton } from '../_components/SubmitButton';
import { H2 } from '@/components/typography';
import { signUp } from '@/app/actions';

export default async function SignUp({
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
    <div className="flex flex-col justify-center flex-1 w-full p-6 rounded-2xl">
      <H2>Sign Up</H2>

      <form
        action={signUp}
        className="flex flex-col justify-center flex-1 w-full gap-2 animate-fade-up-in bg-accent text-accent-foreground p-5 rounded-md"
      >
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="px-4 py-2 mb-6 border rounded-md bg-white"
          name="email"
          placeholder="you@example.com"
          required
        />
        <label className="text-md" htmlFor="password">
          Password
        </label>
        <input
          className="px-4 py-2 mb-6 border rounded-md bg-white"
          type="password"
          name="password"
          required
        />
        <label className="text-md" htmlFor="display_name">
          Display Name
        </label>
        <input
          className="px-4 py-2 mb-6 border rounded-md bg-white"
          name="display_name"
          placeholder="Jane Doe, jdoe94, etc."
          required
        />

        <SubmitButton variant="blue" pendingText="Signing Up...">
          Sign Up
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
