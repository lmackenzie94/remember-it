import { headers } from 'next/headers';
import { createServerClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { SubmitButton } from '../_components/SubmitButton';
import { H2 } from '@/components/typography';

export default async function SignUp({
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

  const signUp = async (formData: FormData) => {
    'use server'; // Next.js "Server Action"

    const origin = headers().get('origin');
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const displayName = formData.get('display_name') as string;
    const supabase = createServerClient();

    // check if display name is already taken
    const { data: profile } = await supabase
      .from('profiles')
      .select()
      .eq('display_name', displayName.trim());

    if (profile && profile.length > 0) {
      return redirect(
        '/signup?message=A user with that display name already exists'
      );
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
        data: {
          user_display_name: displayName.trim()
        }
      }
    });

    // See https://supabase.com/docs/reference/javascript/auth-signup
    // If signUp() is called for an existing confirmed user and...
    // both Confirm email and Confirm phone (even when phone provider is disabled) are enabled in your project, an obfuscated/fake user object is returned.
    // if (
    //   data.user &&
    //   data.user.identities &&
    //   data.user.identities.length === 0
    // ) {
    //   return redirect('/signup?message=A user with that email already exists');
    // }

    if (error) {
      console.log('ERROR', error.message, error.code);
      // ! NOTE: you disabled "Confirm phone" so that error message would be returned when trying to sign up with an existing email
      if (error.code === 'user_already_exists') {
        return redirect(
          '/signup?message=A user with that email already exists'
        );
      }

      return redirect('/signup?message=Could not authenticate user');
    }

    return redirect('/login?message=Check email to continue sign in process');
  };

  return (
    <div className="flex flex-col justify-center flex-1 w-full gap-2 p-6 rounded-2xl">
      <H2>Sign Up</H2>

      <form
        action={signUp}
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
        <label className="text-md" htmlFor="display_name">
          Display Name
        </label>
        <input
          className="px-4 py-2 mb-6 border rounded-md bg-inherit"
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
