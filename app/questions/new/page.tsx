import Question from '@/components/Question';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

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

    if (error) {
      console.error('Error creating question', error);
      return;
    }

    console.log('Question created', data);

    // redirect to the question page
    // redirect(`/questions`);
  }

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">New Question</h2>

      <form action={createQuestion}>
        <label className="block mb-4 text-sm text-gray-700">
          Question
          <input
            name="question"
            className="block w-full px-4 py-2 mt-1 border rounded-md"
          />
        </label>

        <label className="block mb-4 text-sm text-gray-700">
          Answer
          <input
            name="answer"
            className="block w-full px-4 py-2 mt-1 border rounded-md"
          />
        </label>

        <label className="block mb-4 text-sm text-gray-700">
          Private
          <input
            type="checkbox"
            name="private"
            className="block w-full px-4 py-2 mt-1 border rounded-md"
          />
        </label>

        <button
          type="submit"
          className="px-4 py-2 no-underline rounded-md bg-btn-background hover:bg-btn-background-hover"
        >
          Create
        </button>
      </form>
    </div>
  );
}
