import { createServerClient } from '@/utils/supabase/server';
import Question from '@/components/Question';
import { H2 } from '@/components/typography';
import { Profile, QuestionWithProfile } from '@/types';

export default async function Index() {
  const supabase = createServerClient();

  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  const baseQuery = supabase.from('questions').select('*, profiles("*")');

  // if there's a user, get public questions + their own private questions
  if (user) {
    baseQuery.or(`private.eq.false, user_id.eq.${user.id}`);

    // otherwise, only get public questions
  } else {
    baseQuery.eq('private', false);
  }

  // TODO: fix error when using local Supabase - JWSError (CompactDecodeError Invalid number of parts: Expected 3 parts; got 5)

  const { data: questions, error: questionsError } = await baseQuery
    .order('created_at', { ascending: false })
    .limit(6);

  if (questionsError) {
    throw new Error(questionsError.message);
  }

  return (
    <>
      <H2>Question Feed</H2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {questions?.map(q => {
          const question: QuestionWithProfile = {
            ...q,
            profiles: q.profiles as unknown as Profile
          };
          return <Question key={question.id} question={question} user={user} />;
        })}
      </div>
    </>
  );
}
