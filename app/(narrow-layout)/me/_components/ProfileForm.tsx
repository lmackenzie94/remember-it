'use client';

import { createBrowserClient } from '@/utils/supabase/client';
import { redirect, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProfileForm(props: { user: any }) {
  const [updatedDisplayName, setUpdatedDisplayName] = useState('');
  const supabase = createBrowserClient();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    //* OPTION 1: save username to profiles table
    // const { error } = await supabase
    //   .from('profiles')
    //   .upsert({ id: user.id, username });

    //* OPTION 2: save username to user_metadata
    const { data, error } = await supabase.auth.updateUser({
      data: { display_name: updatedDisplayName }
    });

    if (error) {
      console.error('Error saving username ', error);
    }

    console.log('Success saving username ', data);

    // refresh the page to see the updated username
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-2xl">
      <label className="block mb-4 text-sm ">
        Update your display name
        <input
          type="text"
          className="block w-full px-4 py-2 mt-1 border rounded-md"
          value={updatedDisplayName}
          placeholder={props.user.user_metadata.display_name}
          onChange={e => setUpdatedDisplayName(e.target.value)}
        />
      </label>
      <button
        type="submit"
        className="w-full py-2 font-semibold text-white bg-green-500 rounded-md hover:bg-green-600"
      >
        Save
      </button>
    </form>
  );
}
