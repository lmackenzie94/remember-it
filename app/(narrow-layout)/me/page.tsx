import ProfileForm from './_components/ProfileForm';
import { H2 } from '@/components/typography';
import { checkUserAuth, getUserProfile } from '@/utils/supabase/queries';

export default async function Me() {
  const { user } = await checkUserAuth();
  const profile = await getUserProfile(user.id);

  return (
    <div>
      <H2>Hey, {profile?.display_name} 👋</H2>
      <ProfileForm profile={profile} />
    </div>
  );
}
