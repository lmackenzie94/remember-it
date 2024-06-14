import { createServerClient } from '@/utils/supabase/server';
import { revalidateTag } from 'next/cache';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button, buttonVariants } from '@/components/ui/button';

export default async function Question({
  question,
  canEdit
}: {
  question: any;
  canEdit: boolean;
}) {
  // TODO: how to get the creator of the question? Can't do this because only admins can get user by id
  // const supabase = createServerClient();
  // const creator = await supabase.auth.admin.getUserById(question.user_id);

  // const {
  //   data: { user }
  // } = await supabase.auth.getUser();
  // const creatorId = question.user_id;

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
    <Card className="relative">
      {question.private && (
        <Badge variant="green" className="absolute -top-2 -right-2">
          Private
        </Badge>
      )}
      <CardHeader className="mb-10 mt-3">
        <CardTitle>{question.question}</CardTitle>
      </CardHeader>

      {canEdit && (
        <CardFooter className="flex items-center justify-end gap-2">
          <Link
            href={`/questions/${question.id}`}
            className={buttonVariants({ variant: 'secondary', size: 'xs' })}
          >
            View
          </Link>
          <Link
            href={`/questions/${question.id}/edit`}
            className={buttonVariants({ size: 'xs' })}
          >
            Edit
          </Link>
          <form>
            <Button variant="destructive" formAction={deleteQuestion} size="xs">
              Delete
            </Button>
          </form>
        </CardFooter>
      )}
    </Card>
  );
}
