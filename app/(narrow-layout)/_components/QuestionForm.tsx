'use client';

import { Button } from '@/components/ui/button';
// import { Switch } from '@/src/components/Switch';
import { useRouter } from 'next/navigation';
import { useFormState } from 'react-dom';
import { toast } from 'sonner';

import type { Tables } from '@/supabase.d';
import type { State } from '@/app/actions';

type Question = Tables<'questions'>;

export default function Form({
  action,
  buttonText,
  question
}: {
  action: (prevState: State, data: FormData) => Promise<State>;
  buttonText: string;
  question?: Question;
}) {
  const router = useRouter();

  const [state, formAction] = useFormState(action, {
    error: false,
    message: '',
    questionId: question?.id
  });

  console.log('state', state);

  if (state.error) {
    toast.error(state.message);
  }

  if (!state.error && state.message) {
    toast.success(state.message);
    router.push('/questions'); // redirect to the questions page
  }

  return (
    <form action={formAction} className="p-6 rounded-2xl">
      <label className="block mb-4 text-sm ">
        Question
        <input
          name="question"
          defaultValue={question?.question}
          className="block w-full px-4 py-2 mt-1 border rounded-md"
          required
        />
      </label>

      <label className="block mb-4 text-sm ">
        Answer
        <textarea
          name="answer"
          rows={6}
          defaultValue={question?.answer}
          className="block w-full px-4 py-2 mt-1 border rounded-md"
          required
        />
      </label>

      {/* TODO: remove this when Switch works */}
      <label className="flex items-center text-sm gap-2">
        Private?
        <input
          type="checkbox"
          name="private"
          defaultChecked={question?.private}
          className="block w-4 h-4 px-4 py-2 border rounded-md"
        />
      </label>

      {/* TODO: Switch doesn't work - doesn't get included in the FormData  */}
      {/* <Switch id="private" label="Private?" /> */}

      <Button variant="green" className="w-full mt-6">
        {buttonText}
      </Button>
    </form>
  );
}
