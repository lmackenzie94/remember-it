import { headers } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { SubmitButton } from '../_components/SubmitButton';
import { H2 } from '@/src/components/typography';

export default function Login({
  searchParams
}: {
  searchParams: { message: string };
}) {
  const signUp = async (formData: FormData) => {
    'use server'; // Next.js "Server Action"

    const origin = headers().get('origin');
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const displayName = formData.get('display_name') as string;
    const supabase = createClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,

        // add user metadata
        data: {
          display_name: displayName
        }
      }
    });

    if (error) {
      console.log('ERROR', error.message);
      return redirect('/login?message=Could not authenticate user');
    }

    console.log('DATA ', data);

    return redirect('/login?message=Check email to continue sign in process');
  };

  return (
    <div className="flex flex-col justify-center flex-1 w-full gap-2 p-6 bg-white rounded-2xl sm:max-w-md">
      <H2>Sign Up</H2>

      <form className="flex flex-col justify-center flex-1 w-full gap-2 animate-in text-foreground">
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
        <label className="text-md" htmlFor="display_name">
          Display Name
        </label>
        <input
          className="px-4 py-2 mb-6 border rounded-md bg-inherit"
          name="display_name"
          placeholder="Jane Doe, jdoe94, etc."
          required
        />

        <SubmitButton
          formAction={signUp}
          className="py-2 font-semibold text-white bg-green-500 rounded-md hover:bg-green-600"
          pendingText="Signing Up..."
        >
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