'use server';

import { createServerClient } from '@/utils/supabase/server';
import { revalidateTag } from 'next/cache';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const login = async (formData: FormData) => {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const supabase = createServerClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    return redirect('/auth?message=Could not authenticate user');
  }

  return redirect('/');
};

export const signUp = async (formData: FormData) => {
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
      '/auth?message=A user with that display name already exists'
    );
  }

  const { error } = await supabase.auth.signUp({
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
  //   return redirect('/auth?message=A user with that email already exists');
  // }

  if (error) {
    console.log('ERROR', error.message, error.code);
    // ! NOTE: you disabled "Confirm phone" so that error message would be returned when trying to sign up with an existing email
    if (error.code === 'user_already_exists') {
      return redirect('/auth?message=A user with that email already exists');
    }

    return redirect('/auth?message=Could not authenticate user');
  }

  return redirect('/auth?message=Check email to continue sign in process');
};

export const signOut = async () => {
  const supabase = createServerClient();
  await supabase.auth.signOut();
  return redirect('/');
};

export async function createQuestion(prevState: any, formData: FormData) {
  const supabase = createServerClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  const isPrivate = formData.has('private');

  const { data, error } = await supabase
    .from('questions')
    .insert({
      question: formData.get('question') as string,
      answer: formData.get('answer') as string,
      private: isPrivate,
      user_id: user?.id as string
    })
    .select();

  if (error || !data) {
    console.error('Error creating question', error);
    return {
      error: true,
      message: 'Error creating question'
    };
  }

  revalidateTag('questions');

  return {
    error: false,
    message: 'Question created'
  };
}

export type State = {
  error: boolean;
  message: string;
};

export async function updateQuestion(prevState: State, formData: FormData) {
  const supabase = createServerClient();
  const isPrivate = formData.has('private');
  const questionId = formData.get('id') as string;

  const { data, error } = await supabase
    .from('questions')
    .update({
      question: formData.get('question') as string,
      answer: formData.get('answer') as string,
      private: isPrivate
    })
    .eq('id', questionId)
    .select();

  if (error || !data) {
    console.error('Error updating question', error);
    return {
      error: true,
      message: 'Error updating question'
    };
  }

  revalidateTag(`questions/${questionId}`);

  return {
    error: false,
    message: 'Question updated'
  };
}

export async function deleteQuestion(questionId: number) {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('questions')
    .delete()
    .eq('id', questionId)
    .select();

  if (error || !data) {
    console.error('Error deleting question', error);
    return {
      error: true,
      message: 'Error deleting question'
    };
  }

  revalidateTag('questions');

  return {
    error: false,
    message: 'Question deleted'
  };
}
