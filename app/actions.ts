'use server';
import { createServerClient } from '@/utils/supabase/server';
import { revalidateTag } from 'next/cache';

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

  return {
    error: false,
    message: 'Question created'
  };
}

export type State = {
  error: boolean;
  message: string;
  questionId?: number;
};

export async function updateQuestion(prevState: State, formData: FormData) {
  const supabase = createServerClient();
  const isPrivate = formData.has('private');

  if (!prevState.questionId) {
    return {
      error: true,
      message: 'Question ID is required'
    };
  }

  const { data, error } = await supabase
    .from('questions')
    .update({
      question: formData.get('question') as string,
      answer: formData.get('answer') as string,
      private: isPrivate
    })
    .eq('id', prevState.questionId)
    .select();

  if (error || !data) {
    console.error('Error updating question', error);
    return {
      error: true,
      message: 'Error updating question'
    };
  }

  revalidateTag(`questions/${prevState.questionId}`);

  return {
    error: false,
    message: 'Question updated'
  };
}

export async function deleteQuestion(questionId: string) {
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
