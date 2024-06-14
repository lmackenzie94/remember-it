import { createServerClient } from '@/utils/supabase/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import Link from 'next/link';

export default async function Question({
  question,
  canEdit
}: {
  question: any;
  canEdit: boolean;
}) {
  // TODO: how to get the creator of the question? Can't do this because only admins can get user by id
  const supabase = createServerClient();
  // const creator = await supabase.auth.admin.getUserById(question.user_id);

  const {
    data: { user }
  } = await supabase.auth.getUser();
  const creatorId = question.user_id;

  const deleteQuestion = async () => {
    'use server';

    // had to recall createServerClient here otherwise it was throwing an error
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('questions')
      .delete()
      .eq('id', question.id)
      .select();

    if (error || !data) {
      console.error('Error deleting question', error);
      return;
    }

    console.log('Question deleted', data);

    // refreshes the page
    revalidateTag('questions');
  };

  return (
    <Link href={`/questions/${question.id}`}>
      <article className="relative flex flex-col justify-between p-4 bg-white border rounded-2xl shadow-lg shadow-gray-200 min-h-56 hover:shadow-none hover:scale-[0.99] transition-all">
        <div className="flex items-center justify-center flex-1">
          <h3 className="mb-2 text-2xl font-black">{question.question}</h3>
          {question.private && (
            <span className="absolute px-2 py-1 text-xs font-semibold text-white rounded-full bg-violet-800 -top-2 -right-2">
              <p>Private</p>
            </span>
          )}
        </div>

        {/*! Can't have nested links */}

        {/* {canEdit && (
          <div className="flex items-center justify-end gap-4">
            <form>
              <button
                formAction={deleteQuestion}
                className="px-4 py-2 text-white no-underline bg-red-500 rounded-md hover:bg-red-600"
              >
                Delete
              </button>

              <Link href={`/questions/${question.id}/edit`}>Edit</Link>
            </form>
          </div>
        )} */}
      </article>
    </Link>
  );
}
