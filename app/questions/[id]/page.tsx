import { H2 } from '@/components/typography';
import { checkUserAuth } from '@/utils/supabase/queries';
import { createServerClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
  const supabase = createServerClient();

  // get question by id
  //? users can't view other user's private questions b/c of RLS policy in Supabase
  const { data, error } = await supabase
    .from('questions')
    .select()
    .eq('id', params.id)
    .single();

  if (!data || error) {
    console.error('Error getting question', error);
    redirect('/questions');
  }

  if (data.private) {
    await checkUserAuth();
  }

  return (
    <article className="max-w-[60ch] mx-auto">
      <H2>{data.question}</H2>
      <p>{data.answer}</p>
    </article>
  );
}
