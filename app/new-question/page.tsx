//! I tried adding this route to the "questions" folder (i.e. app/questions/new/page.tsx) but it didn't work once I added intercepting routes...
//! When I tried navigating to /questions/new, the app/questions/@modal/(..)questions/[id]/page.tsx would intercept it and use "new" as the question ID, which obviously caused on error
//! Not sure if there's a way to exclude certain routes from being intercepted...

import Question from '@/components/Question';
import { createServerClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import QuestionForm from '../(narrow-layout)/_components/QuestionForm';
import { H2 } from '@/components/typography';
import NarrowContainer from '@/components/NarrowContainer';
import { createQuestion } from '../actions';

export default async function Page() {
  const supabase = createServerClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/login');
  }

  return (
    <NarrowContainer>
      <H2>New Question</H2>
      <QuestionForm
        action={createQuestion}
        buttonText="Create"
        pendingText="Creating..."
      />
    </NarrowContainer>
  );
}
