import { redirect } from 'next/navigation';
import QuestionForm from '../../../(narrow-layout)/_components/QuestionForm';
import { H2 } from '@/components/typography';
import NarrowContainer from '@/components/NarrowContainer';
import { updateQuestion } from '@/app/actions';
import { checkUserAuth } from '@/utils/supabase/queries';

export default async function Page({ params }: { params: { id: string } }) {
  const { user, supabase } = await checkUserAuth();

  // get question by id and user_id
  const { data, error } = await supabase
    .from('questions')
    .select()
    .eq('id', params.id)
    .eq('user_id', user.id)
    .single();

  if (error) {
    // users shouldn't be able to go to the edit page of a question that 1) doesn't exist or 2) they don't own
    console.error('Error getting question', error);
    redirect('/questions');
  }

  return (
    <NarrowContainer>
      <H2>Update Question</H2>

      <QuestionForm type="update" action={updateQuestion} question={data} />
    </NarrowContainer>
  );
}
