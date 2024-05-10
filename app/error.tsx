'use client';
export default function Error({ error }: { error: Error }) {
  console.error(error);
  return (
    <>
      <h2>Something went wrong, man</h2>
      <p>{error.message}</p>
    </>
  );
}
