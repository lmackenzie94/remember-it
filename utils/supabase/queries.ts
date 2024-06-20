import { redirect } from 'next/navigation';
import { createServerClient } from './server';
import { User } from '@supabase/supabase-js';

// ? RE: calling createServerClient() in every function (from Supabase docs)
// On the server, it basically configures a fetch call. You need to reconfigure the fetch call anew for every request to your server, because you need the cookies from the request.
// On the client, createBrowserClient already uses a singleton pattern, so you only ever create one instance, no matter how many times you call your createClient function.

export const getUserProfile = async (userId: string) => {
  const supabase = createServerClient();

  const { data: profile } = await supabase
    .from('profiles')
    .select()
    .eq('id', userId)
    .single();

  if (!profile) {
    throw new Error('User profile not found');
  }

  return profile;
};

export const getMyQuestions = async () => {
  const { supabase, user } = await checkUserAuth();

  const { data, error } = await supabase
    .from('questions')
    .select(`*, profiles("*")`)
    .eq('user_id', user.id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const checkUserAuth = async (): Promise<{
  supabase: ReturnType<typeof createServerClient>;
  user: User;
}> => {
  const supabase = createServerClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/auth');
  }

  return { supabase, user: data.user };
};
