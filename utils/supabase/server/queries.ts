import { redirect } from 'next/navigation';
import { createServerClient } from '../server';

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
  const supabase = createServerClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/login');
  }

  const { data: questions, error: questionsError } = await supabase
    .from('questions')
    .select(`*, profiles("*")`)
    .eq('user_id', data.user.id);

  if (questionsError) {
    throw new Error(questionsError.message);
  }

  return questions;
};

export const signOut = async () => {
  const supabase = createServerClient();
  await supabase.auth.signOut();
  return redirect('/');
};
