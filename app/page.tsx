import Footer from '@/src/components/Footer';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Question from '@/src/components/Question';
import { H2 } from '@/src/components/typography';

export default async function Index() {
  const supabase = createClient();
  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/login');
  }

  /* get all questions that are either 1) public or 2) owned by the current user */
  const { data: questions, error: questionsError } = await supabase
    .from('questions')
    .select()
    .or(`private.eq.false, user_id.eq.${user.id}`);

  if (questionsError) {
    console.error('Error getting questions', questionsError);
  }

  return (
    <div className="">
      <H2>Question Feed</H2>

      <div className="grid grid-cols-3 gap-4">
        {questions?.map((question: any) => (
          <Question
            key={question.id}
            question={question}
            canEdit={question.user_id === user.id}
          />
        ))}
      </div>
    </div>
  );
}
