import Question from '@/src/components/Question';
import { createClient } from '@/utils/supabase/server';
// import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import QuestionForm from '../../_components/QuestionForm';
import { H2 } from '@/src/components/typography';

export default async function Page() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/login');
  }

  async function createQuestion(formData: FormData) {
    'use server'; // Next.js "Server Action"

    // had to recall createClient here otherwise it was throwing an error
    const supabase = createClient();

    const {
      data: { user }
    } = await supabase.auth.getUser();

    const isPrivate = formData.has('private');

    // insert
    const { data, error } = await supabase
      .from('questions')
      .insert({
        question: formData.get('question') as string,
        answer: formData.get('answer') as string,
        private: isPrivate,
        user_id: user?.id
      })
      .select();

    if (error || !data) {
      console.error('Error creating question', error);
      throw new Error(error.details || error.message);
    }

    console.log('Question created', data);

    // redirect to the question page
    redirect(`/questions`);
  }

  return (
    <div>
      <H2>New Question</H2>
      <QuestionForm action={createQuestion} buttonText="Create" />
    </div>
  );
}
