'use client';

// import { Switch } from '@/components/Switch';
import { useRouter } from 'next/navigation';
import { useFormState } from 'react-dom';
import { toast } from 'sonner';

import type { State } from '@/app/actions';
import type { Question } from '@/types';
import { SubmitButton } from '../(auth)/_components/SubmitButton';

type CreateFormProps = {
  type: 'create';
  action: (prevState: State, data: FormData) => Promise<State>;
};

type UpdateFormProps = {
  type: 'update';
  action: (prevState: State, data: FormData) => Promise<State>;
  question: Question;
};

export default function Form(props: CreateFormProps | UpdateFormProps) {
  const { type, action } = props;

  const router = useRouter();

  //* useFormState() has since been renamed to useActionState() in React 19 but Next.js doesn't support it yet
  const [state, formAction] = useFormState(action, {
    error: false,
    message: ''
  });

  if (state.error) {
    toast.error(state.message);
  }

  if (!state.error && state.message) {
    router.push('/questions'); // redirect to the questions page
    toast.success(state.message);
  }

  const buttonText = type === 'create' ? 'Create' : 'Update';
  const pendingText = type === 'create' ? 'Creating...' : 'Updating...';

  return (
    <form
      action={formAction}
      className={`animate-fade-up-in p-5 rounded-md ${
        type === 'create'
          ? 'bg-green/10 dark:bg-green/30'
          : 'bg-blue/10 dark:bg-blue/30'
      }`}
    >
      <label className="block mb-5 text-sm font-semibold">
        Question
        <input
          name="question"
          defaultValue={type === 'update' ? props.question.question : ''}
          className="block w-full px-4 py-2 mt-1 border rounded-md bg-white text-black font-normal"
          required
        />
      </label>

      <label className="block mb-5 text-sm font-semibold">
        Answer
        <textarea
          name="answer"
          rows={8}
          defaultValue={type === 'update' ? props.question.answer : ''}
          className="block w-full px-4 py-2 mt-1 border rounded-md bg-white text-black font-normal"
          required
        />
      </label>

      {/* TODO: remove this when Switch works */}
      <label className="flex items-center gap-2 text-sm font-semibold">
        Private?
        <input
          type="checkbox"
          name="private"
          defaultChecked={type === 'update' ? props.question.private : false}
          className="block w-4 h-4 px-4 py-2 border rounded-md font-normal"
        />
      </label>

      {/* TODO: Switch doesn't work - doesn't get included in the FormData  */}
      {/* <Switch id="private" label="Private?" /> */}

      {/* hidden ID field for updating */}
      {type === 'update' && (
        <input type="hidden" name="id" value={props.question.id} />
      )}

      <SubmitButton
        variant={type === 'create' ? 'green' : 'blue'}
        pendingText={pendingText}
        className="w-full mt-6"
      >
        {buttonText}
      </SubmitButton>
    </form>
  );
}
