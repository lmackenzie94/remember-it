import ProfileForm from './_components/ProfileForm';
import { H2 } from '@/src/components/typography';
import { createServerClient } from '@/utils/supabase/server';
import { getUserProfile } from '@/utils/supabase/server/queries';
import { redirect } from 'next/navigation';

export default async function Me() {
  const supabase = createServerClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/login');
  }

  const profile = await getUserProfile(data.user.id);

  return (
    <div>
      <H2>Hey, {profile?.display_name} 👋</H2>
      <ProfileForm profile={profile} />
    </div>
  );
}
