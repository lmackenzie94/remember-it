import { redirect } from 'next/navigation';
import { createClient } from '../server';

export const getMyQuestions = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/login');
  }

  const { data: questions, error: questionsError } = await supabase
    .from('questions')
    .select()
    .eq('user_id', data.user.id);

  if (questionsError) {
    throw new Error(questionsError.message);
  }

  return questions;
};

export const signOut = async () => {
  const supabase = createClient();
  await supabase.auth.signOut();
  return redirect('/login');
};
