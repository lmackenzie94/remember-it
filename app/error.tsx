'use client';

import { H2 } from '@/src/components/typography';

export default function Error({ error }: { error: Error }) {
  console.error(error);
  return (
    <div className="text-center">
      <H2>Something went wrong...</H2>
      <p className="text-lg text-red-800">{error.message}</p>
    </div>
  );
}
