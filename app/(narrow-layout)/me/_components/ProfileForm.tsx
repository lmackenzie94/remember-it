'use client';

import { createBrowserClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitButton } from '../../../auth/_components/SubmitButton';
import { toast } from 'sonner';
import { Profile } from '@/types';

export default function ProfileForm({ profile }: { profile: Profile }) {
  const [updatedDisplayName, setUpdatedDisplayName] = useState(
    profile.display_name
  );
  const supabase = createBrowserClient();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.from('profiles').upsert({
      id: profile.id,
      display_name: updatedDisplayName,
      email: profile.email
    });

    if (error) {
      toast.error(
        error.code === '23505' ? 'Username already taken' : error.message
      );
      return;
    }

    toast.success('Success saving username');

    // refresh the page to see the updated username
    router.refresh();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="animate-fade-up-in p-5 rounded-md bg-green/10 dark:bg-green/30"
    >
      <label className="block mb-4 text-sm font-semibold">
        Display Name
        <input
          type="text"
          className="block w-full px-4 py-2 mt-1 border rounded-md bg-white text-black font-normal"
          value={updatedDisplayName}
          onChange={e => setUpdatedDisplayName(e.target.value)}
          placeholder="Enter your display name"
          required
        />
      </label>

      {/* email readonly for now */}
      <label className="block mb-4 text-sm font-semibold">
        Email
        <input
          type="text"
          className="block w-full px-4 py-2 mt-1 border rounded-md bg-white text-black font-normal"
          value={profile.email}
          readOnly={true}
          disabled
        />
      </label>
      <SubmitButton variant="green" pendingText="Saving..." className="w-full">
        Save
      </SubmitButton>
    </form>
  );
}
