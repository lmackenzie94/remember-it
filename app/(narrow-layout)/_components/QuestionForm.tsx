// import MDEditor from '@/src/components/MarkdownEditor';

import { Button } from '@/components/ui/button';
import { Switch } from '@/src/components/Switch';

export default function Form({
  action,
  buttonText,
  question
}: {
  action: (data: FormData) => Promise<void>;
  buttonText: string;
  question?: {
    question: string;
    answer: string;
    private: boolean;
  };
}) {
  return (
    <form action={action} className="p-6 rounded-2xl">
      <label className="block mb-4 text-sm ">
        Question
        <input
          name="question"
          defaultValue={question?.question}
          className="block w-full px-4 py-2 mt-1 border rounded-md"
        />
      </label>

      <label className="block mb-4 text-sm ">
        Answer
        <textarea
          name="answer"
          rows={6}
          defaultValue={question?.answer}
          className="block w-full px-4 py-2 mt-1 border rounded-md"
        />
      </label>

      {/* TODO: I think I have to make this a client component to use MDEditor, that way I can save the value to state */}
      {/* <MDEditor value={''} height="200px" /> */}

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

      <Button variant="green" type="submit" className="w-full mt-6">
        {buttonText}
      </Button>
    </form>
  );
}
