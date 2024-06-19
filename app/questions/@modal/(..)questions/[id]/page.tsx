//! This is a "parallel intercepting route" (see here for explanation: https://www.youtube.com/watch?v=mVOvx9eVHg0&list=PLC3y8-rFHvwjOKd6gdf4QtV1uYNiQnruI&index=32)

import Modal from '@/components/Modal';
import { H2 } from '@/components/typography';
import { checkUserAuth } from '@/utils/supabase/queries';
import { redirect } from 'next/navigation';

//* This page is only displayed when navigating to a Question page, not when you go directly to the URL / reload the page
export default async function InterceptedQuestionPage({
  params
}: {
  params: { id: string };
}) {
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
    <Modal>
      <article className="py-12 px-16 bg-muted rounded-2xl">
        <div className="max-w-[60ch] mx-auto">
          <H2>{data.question}</H2>
          <p className="text-muted-foreground">{data.answer}</p>
        </div>
      </article>
    </Modal>
  );
}
