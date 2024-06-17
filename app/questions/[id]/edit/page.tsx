import Question from '@/src/components/Question';
import { createServerClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import QuestionForm from '../../../(narrow-layout)/_components/QuestionForm';
import { H2 } from '@/src/components/typography';
import NarrowContainer from '@/src/components/NarrowContainer';
import { updateQuestion } from '@/app/actions';

export default async function Page({ params }: { params: { id: string } }) {
  const supabase = createServerClient();

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

  return (
    <NarrowContainer>
      <H2>Update Question</H2>

      <QuestionForm
        action={updateQuestion}
        question={question}
        buttonText="Update"
        pendingText="Updating..."
      />
    </NarrowContainer>
  );
}
