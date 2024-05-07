import { createClient } from '@/utils/supabase/server';
import { revalidateTag } from 'next/cache';
import Link from 'next/link';

export default async function Question({
  question,
  canEdit
}: {
  question: any;
  canEdit: boolean;
}) {
  // TODO: how to get the creator of the question? Can't do this because only admins can get user by id
  const supabase = createClient();
  // const creator = await supabase.auth.admin.getUserById(question.user_id);

  const {
    data: { user }
  } = await supabase.auth.getUser();
  const creatorId = question.user_id;

  const deleteQuestion = async () => {
    'use server';

    // had to recall createClient here otherwise it was throwing an error
    const supabase = createClient();
    const { data, error } = await supabase
      .from('questions')
      .delete()
      .eq('id', question.id);

    if (error || !data) {
      console.error('Error deleting question', error);
      return;
    }

    console.log('Question deleted', data);

    // refreshes the page
    revalidateTag('questions');
  };

  return (
    <div key={question.id} className="p-4 mb-4 border rounded-md">
      <h3 className="font-semibold">{question.question}</h3>
      <p>{question.answer}</p>
      <p>{question.private ? 'Private' : 'Public'}</p>
      <p>
        Creator:{' '}
        {user?.id === creatorId
          ? `You (${user?.id})`
          : `Someone else (${creatorId})`}
      </p>

      {canEdit && (
        <div className="flex gap-2">
          <Link
            href={`/questions/${question.id}/edit`}
            className="text-blue-500"
          >
            Edit
          </Link>
          <form>
            <button
              formAction={deleteQuestion}
              className="px-4 py-2 no-underline rounded-md bg-btn-background hover:bg-btn-background-hover"
            >
              Delete
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
