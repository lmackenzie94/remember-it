import Question from '@/src/components/Question';
import { H2 } from '@/src/components/typography';
import { getMyQuestions } from '@/utils/supabase/server/queries';

export default async function Page() {
  const questions = await getMyQuestions();

  return (
    <div>
      <H2>My Questions</H2>

      {!questions || (questions.length === 0 && <p>No questions found.</p>)}

      <div className="grid grid-cols-3 gap-8">
        {questions?.map((question: any) => {
          return (
            <Question key={question.id} question={question} canEdit={true} />
          );
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
