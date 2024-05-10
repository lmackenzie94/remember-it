import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import ProfileForm from './_components/ProfileForm';
import { H2 } from '@/src/components/typography';

export default async function Me() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/login');
  }

  return (
    <div>
      <H2>Update Your Profile</H2>
      <ProfileForm user={data.user} />
    </div>
  );
}
