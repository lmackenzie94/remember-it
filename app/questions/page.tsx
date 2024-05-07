import Question from '@/components/Question';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function Page() {
  const supabase = createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login');
  }

  const { data: questions } = (await supabase.from('questions').select()) as {
    data: any[];
  };

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">Questions</h2>

      {questions.length === 0 && <p>No questions found.</p>}
      {questions.map((question: any) => {
        const canEdit = question.user_id === user.id;
        return (
          <Question key={question.id} question={question} canEdit={canEdit} />
        );
      })}
    </div>
  );
}

// Client Component example:

// 'use client'

// import { createClient } from '@/utils/supabase/client'
// import { useEffect, useState } from 'react'

// export default function Page() {
//   const [notes, setNotes] = useState<any[] | null>(null)
//   const supabase = createClient()

//   useEffect(() => {
//     const getData = async () => {
//       const { data } = await supabase.from('notes').select()
//       setNotes(data)
//     }
//     getData()
//   }, [])

//   return <pre>{JSON.stringify(notes, null, 2)}</pre>
// }
