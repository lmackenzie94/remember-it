import Link from 'next/link';
import { createServerClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { SubmitButton } from '../_components/SubmitButton';
import { H2 } from '@/src/components/typography';

export default function Login({
  searchParams
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    'use server';

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const supabase = createServerClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      return redirect('/login?message=Could not authenticate user');
    }

    return redirect('/');
  };

  return (
    <div className="flex flex-col justify-center flex-1 w-full gap-2 p-6 bg-white rounded-2xl sm:max-w-md">
      <H2>Sign In</H2>
      <form className="flex flex-col justify-center flex-1 w-full gap-2 animate-fade-up-in text-foreground">
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

        <SubmitButton
          formAction={signIn}
          className="py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600"
          pendingText="Signing In..."
        >
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
