import Question from '@/components/Question';
import { H2 } from '@/components/typography';
import { Profile, QuestionWithProfile } from '@/types';
import { checkUserAuth, getMyQuestions } from '@/utils/supabase/queries';
import Link from 'next/link';

export default async function Page() {
  const { user } = await checkUserAuth();
  const questions = await getMyQuestions();

  return (
    <div>
      <H2>My Questions</H2>

      {!questions ||
        (questions.length === 0 && (
          <p className="text-center">
            Looks like you haven&apos;t created any questions yet &mdash; go
            ahead and{' '}
            <Link href="/new-question" className="font-bold underline">
              add one
            </Link>
            !
          </p>
        ))}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {questions?.map(q => {
          const question: QuestionWithProfile = {
            ...q,
            profiles: q.profiles as unknown as Profile
          };
          return <Question key={question.id} question={question} user={user} />;
        })}
      </div>
    </div>
  );
}

// Client Component example:

// 'use client'

// import { createServerClient } from '@/utils/supabase/client'
// import { useEffect, useState } from 'react'

// export default function Page() {
//   const [notes, setNotes] = useState<any[] | null>(null)
//   const supabase = createBrowserClient()

//   useEffect(() => {
//     const getData = async () => {
//       const { data } = await supabase.from('notes').select()
//       setNotes(data)
//     }
//     getData()
//   }, [])

//   return <pre>{JSON.stringify(notes, null, 2)}</pre>
// }
