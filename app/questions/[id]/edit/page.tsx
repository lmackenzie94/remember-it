import Question from '@/components/Question';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/login');
  }

  // get question by id and user_id
  const { data: question, error: questionError } = await supabase
    .from('questions')
    .select()
    .eq('id', params.id)
    .eq('user_id', data.user.id)
    .single();

  if (questionError) {
    // users shouldn't be able to go to the edit page of a question that 1) doesn't exist or 2) they don't own
    console.error('Error getting question', questionError);
    redirect('/questions');
  }

  async function updateQuestion(formData: FormData) {
    'use server'; // Next.js "Server Action"

    // had to recall createClient here otherwise it was throwing an error
    const supabase = createClient();
    const isPrivate = formData.has('private');

    const { data, error } = await supabase
      .from('questions')
      .update({
        question: formData.get('question') as string,
        answer: formData.get('answer') as string,
        private: isPrivate
      })
      .eq('id', params.id)
      .select();

    if (error) {
      console.error('Error updating question', error);
    }

    console.log('Question updated', data);

    // TODO: not sure which is better..?
    // revalidatePath(`/questions/${params.id}/edit`);
    revalidateTag('questions');
  }

  return (
    <div>
      <h2 className="mb-4 text-4xl font-bold">Edit Question</h2>

      <Question question={question} canEdit={true} />

      <form action={updateQuestion}>
        <label className="block mb-4 text-sm text-gray-700">
          Question
          <input
            name="question"
            defaultValue={question.question}
            className="block w-full px-4 py-2 mt-1 border rounded-md"
          />
        </label>

        <label className="block mb-4 text-sm text-gray-700">
          Answer
          <input
            name="answer"
            defaultValue={question.answer}
            className="block w-full px-4 py-2 mt-1 border rounded-md"
          />
        </label>

        <label className="block mb-4 text-sm text-gray-700">
          Private
          <input
            type="checkbox"
            name="private"
            defaultChecked={question.private}
            className="block w-full px-4 py-2 mt-1 border rounded-md"
          />
        </label>

        <button
          type="submit"
          className="px-4 py-2 no-underline rounded-md bg-btn-background hover:bg-btn-background-hover"
        >
          Update
        </button>
      </form>
    </div>
  );
}
