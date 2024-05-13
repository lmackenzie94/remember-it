import Question from '@/src/components/Question';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import QuestionForm from '../../../(narrow-layout)/_components/QuestionForm';
import { H2 } from '@/src/components/typography';
import NarrowContainer from '@/src/components/NarrowContainer';

export default async function Page({ params }: { params: { id: string } }) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/login');
  }

  // get question by id and user_id
  const { data: question, error: questionError } = await supabase
    .from('questions')
    .select()
    .eq('id', params.id)
    .eq('user_id', data.user.id)
    .single();

  if (questionError) {
    // users shouldn't be able to go to the edit page of a question that 1) doesn't exist or 2) they don't own
    console.error('Error getting question', questionError);
    redirect('/questions');
  }

  async function updateQuestion(formData: FormData) {
    'use server'; // Next.js "Server Action"

    // had to recall createClient here otherwise it was throwing an error
    const supabase = createClient();
    const isPrivate = formData.has('private');

    const { data, error } = await supabase
      .from('questions')
      .update({
        question: formData.get('question') as string,
        answer: formData.get('answer') as string,
        private: isPrivate
      })
      .eq('id', params.id)
      .select();

    if (error || !data) {
      console.error('Error updating question', error);
      throw new Error(error.message);
    }

    console.log('Question updated', data);

    // TODO: not sure which is better..?
    // revalidatePath(`/questions/${params.id}/edit`);
    revalidateTag('questions');
  }

  return (
    <NarrowContainer>
      <H2>Update Question</H2>

      <QuestionForm
        action={updateQuestion}
        question={question}
        buttonText="Update"
      />
    </NarrowContainer>
  );
}
