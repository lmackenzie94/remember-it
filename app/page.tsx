import Footer from '@/src/components/Footer';
import { createClient } from '@/utils/supabase/server';
import Question from '@/src/components/Question';
import { H2 } from '@/src/components/typography';

export default async function Index() {
  const supabase = createClient();

  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  // if (error) {
  //   throw new Error(error.message);
  // }

  const baseQuery = supabase.from('questions').select();

  // if there's a user, get public questions + their own private questions
  if (user) {
    baseQuery.or(`private.eq.false, user_id.eq.${user.id}`);

    // otherwise, only get public questions
  } else {
    baseQuery.eq('private', false);
  }

  const { data: questions, error: questionsError } = await baseQuery
    .order('created_at', { ascending: false })
    .limit(6);

  if (questionsError) {
    throw new Error(questionsError.message);
  }

  return (
    <div className="">
      <H2>Recent Questions</H2>

      <div className="grid grid-cols-3 gap-4">
        {questions?.map((question: any) => (
          <Question key={question.id} question={question} canEdit={false} />
        ))}
      </div>
    </div>
  );
}
