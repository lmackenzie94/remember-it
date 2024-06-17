//! This is a "parallel intercepting route" (see here for explanation: https://www.youtube.com/watch?v=mVOvx9eVHg0&list=PLC3y8-rFHvwjOKd6gdf4QtV1uYNiQnruI&index=32)

import Modal from '@/src/components/Modal';
import { H2 } from '@/src/components/typography';
import { createServerClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

//* This page is only displayed when navigating to a Question page, not when you go directly to the URL / reload the page
export default async function InterceptedQuestionPage({
  params
}: {
  params: { id: string };
}) {
  const supabase = createServerClient();

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
    // overlay modal
    <Modal>
      <article className="py-12 px-16 bg-muted rounded-2xl">
        <div className="max-w-[60ch] mx-auto">
          <H2>{question.question}</H2>
          <p className="text-muted-foreground">{question.answer}</p>
        </div>
      </article>
    </Modal>
  );
}
