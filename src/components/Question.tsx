'use client';

import Link from 'next/link';
import { Badge } from '@/src/components/ui/badge';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/src/components/ui/card';
import { Button, buttonVariants } from '@/src/components/ui/button';
import { deleteQuestion } from '@/app/actions';
import { toast } from 'sonner';
import type { QuestionWithProfile } from '@/types';
import { User } from '@supabase/supabase-js';

export default function Question({
  question,
  user
}: {
  question: QuestionWithProfile;
  user: User | null;
}) {
  const handleDelete = async () => {
    const { error, message } = await deleteQuestion(question.id); // call server action

    if (error) {
      toast.error(message);
      return;
    }

    console.log('Question deleted...');

    toast.success(message);
  };

  // const deleteQuestion = async () => {
  //   'use server';

  //   const supabase = createServerClient();
  //   const { data, error } = await supabase
  //     .from('questions')
  //     .delete()
  //     .eq('id', question.id)
  //     .select();

  //   if (error || !data) {
  //     console.error('Error deleting question', error);
  //     return;
  //   }

  //   console.log('Question deleted', data);

  //   // refreshes the page
  //   revalidateTag('questions');
  // };

  const authorIsCurrentUser = user && user.id === question.profiles.id;

  return (
    <Card className="relative flex flex-col justify-between gap-y-8 bg-muted/50 pt-2">
      {question.private && (
        <Badge variant="green" className="absolute -top-2 -right-2">
          Private
        </Badge>
      )}
      <CardHeader>
        <CardTitle className="leading-tight">{question.question}</CardTitle>
        <CardDescription>
          Asked by{' '}
          <span className="font-bold">
            {authorIsCurrentUser ? `You` : question.profiles.display_name}
          </span>
        </CardDescription>
      </CardHeader>

      {authorIsCurrentUser && (
        <CardFooter className="flex items-center justify-end gap-2">
          <Link
            href={`/questions/${question.id}`}
            className={`${buttonVariants({
              variant: 'white',
              size: 'xs'
            })} border border-input`}
          >
            View
          </Link>
          <Link
            href={`/questions/${question.id}/edit`}
            className={buttonVariants({ variant: 'blue', size: 'xs' })}
          >
            Edit
          </Link>
          {/* <form>
            <Button variant="destructive" formAction={deleteQuestion} size="xs">
              Delete
            </Button>
          </form> */}

          {/* TODO: do this without making the whole component a client-side component */}
          <Button variant="destructive" onClick={handleDelete} size="xs">
            Delete
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
