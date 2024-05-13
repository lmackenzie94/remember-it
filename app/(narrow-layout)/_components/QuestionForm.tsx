// import MDEditor from '@/src/components/MarkdownEditor';

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
    <form action={action} className="p-6 bg-white rounded-2xl">
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

      <label className="flex flex-col items-start mb-4 text-sm ">
        Private?
        <input
          type="checkbox"
          name="private"
          defaultChecked={question?.private}
          className="block w-4 h-4 px-4 py-2 mt-2 border rounded-md"
        />
      </label>

      <button
        type="submit"
        className="w-full py-2 font-semibold text-white bg-green-500 rounded-md hover:bg-green-600"
      >
        {buttonText}
      </button>
    </form>
  );
}