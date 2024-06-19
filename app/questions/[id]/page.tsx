import Question from '@/components/Question';
import { H2 } from '@/components/typography';
import { checkUserAuth } from '@/utils/supabase/queries';
import { redirect } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
  const { supabase } = await checkUserAuth();

  // get question by id
  const { data, error } = await supabase
    .from('questions')
    .select()
    .eq('id', params.id)
    .single();

  if (error) {
    console.error('Error getting question', error);
    redirect('/questions');
  }

  return (
    <article className="max-w-[60ch] mx-auto">
      <H2>{data.question}</H2>
      <p>{data.answer}</p>
    </article>
  );
}
