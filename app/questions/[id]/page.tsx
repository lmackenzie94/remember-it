import Question from '@/components/Question';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/login');
  }

  // get question by id
  const { data: question, error: questionError } = await supabase
    .from('questions')
    .select()
    .eq('id', params.id)
    .single();

  if (questionError) {
    // users shouldn't be able to go to the edit page of a question that 1) doesn't exist or 2) they don't own
    console.error('Error getting question', questionError);
    redirect('/questions');
  }

  return (
    <div>
      <Question question={question} canEdit={true} />
    </div>
  );
}