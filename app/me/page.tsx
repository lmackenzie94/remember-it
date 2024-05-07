import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import Form from './_components/form';

export default async function Me() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/login');
  }

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">
        Hello, {data.user.user_metadata.display_name}
      </h2>
      <Form user={data.user} />
    </div>
  );
}
