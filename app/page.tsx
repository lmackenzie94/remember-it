import Footer from '@/components/Footer';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Question from '@/components/Question';

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
      <h2 className="mb-4 text-4xl font-bold">Question Feed</h2>

      {questions?.map((question: any) => (
        <Question
          key={question.id}
          question={question}
          canEdit={question.user_id === user.id}
        />
      ))}
    </div>
  );
}
