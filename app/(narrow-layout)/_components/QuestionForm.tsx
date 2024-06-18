'use client';

// import { Switch } from '@/components/Switch';
import { useRouter } from 'next/navigation';
import { useFormState } from 'react-dom';
import { toast } from 'sonner';

import type { State } from '@/app/actions';
import type { Question } from '@/types';
import { SubmitButton } from '../(auth)/_components/SubmitButton';

export default function Form({
  action,
  buttonText,
  pendingText,
  question
}: {
  action: (prevState: State, data: FormData) => Promise<State>;
  buttonText: string;
  pendingText: string;
  question?: Question;
}) {
  const router = useRouter();

  const [state, formAction] = useFormState(action, {
    error: false,
    message: '',
    questionId: question?.id
  });

  if (state.error) {
    toast.error(state.message);
  }

  if (!state.error && state.message) {
    router.push('/questions'); // redirect to the questions page
    toast.success(state.message);
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
      <label className="flex items-center gap-2 text-sm">
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

      <SubmitButton
        variant="green"
        pendingText={pendingText}
        className="w-full mt-6"
      >
        {buttonText}
      </SubmitButton>
    </form>
  );
}
