//! I tried adding this route to the "questions" folder (i.e. app/questions/new/page.tsx) but it didn't work once I added intercepting routes...
//! When I tried navigating to /questions/new, the app/questions/@modal/(..)questions/[id]/page.tsx would intercept it and use "new" as the question ID, which obviously caused on error
//! Not sure if there's a way to exclude certain routes from being intercepted...

import Question from '@/src/components/Question';
import { createClient } from '@/utils/supabase/server';
// import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import QuestionForm from '../(narrow-layout)/_components/QuestionForm';
import { H2 } from '@/src/components/typography';
import NarrowContainer from '@/src/components/NarrowContainer';

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
    <NarrowContainer>
      <H2>New Question</H2>
      <QuestionForm action={createQuestion} buttonText="Create" />
    </NarrowContainer>
  );
}
