import Link from 'next/link';

export default function Question({
  question,
  canEdit
}: {
  question: any;
  canEdit: boolean;
}) {
  return (
    <div key={question.id} className="p-4 mb-4 border rounded-md">
      <h3 className="font-semibold">{question.question}</h3>
      <p>{question.answer}</p>
      <p>{question.private ? 'Private' : 'Public'}</p>

      {canEdit && (
        <Link href={`/questions/${question.id}/edit`} className="text-blue-500">
          Edit
        </Link>
      )}
    </div>
  );
}
