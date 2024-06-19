/**
 * Use any TypeScript runner to run this script, for example: `npx tsx seed.ts`
 * Learn more about the Seed Client by following our guide: https://docs.snaplet.dev/seed/getting-started
 */
import { createSeedClient, profilesScalars } from '@snaplet/seed';
import { createClient } from '@supabase/supabase-js';
import { Database } from './supabase';
// import { copycat } from '@snaplet/copycat';

const main = async () => {
  const seed = await createSeedClient();

  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Clears all existing data in the database, but keep the structure
  await seed.$resetDatabase();

  // const PASSWORD = 'testuser';
  // for (let i = 0; i < 2; i += 1) {
  //   const email = copycat.email(i).toLowerCase();
  //   const fullName: string = copycat.fullName(i);

  //   await supabase.auth.signUp({
  //     email,
  //     password: PASSWORD,
  //     options: {
  //       data: {
  //         user_display_name: fullName
  //       }
  //     }
  //   });
  // }

  await supabase.auth.signUp({
    email: 'luke@test.com',
    password: 'password',
    options: {
      data: {
        user_display_name: 'Luke (Personal)'
      }
    }
  });
  await supabase.auth.signUp({
    email: 'luke-work@test.com',
    password: 'password',
    options: {
      data: {
        user_display_name: 'Luke (Work)'
      }
    }
  });

  const { data: dbProfiles, error } = await supabase.from('profiles').select();

  if (error) {
    console.error('ERROR', error);
  }

  console.log('DB Profiles', dbProfiles);

  //  We convert our database fields to something that our seed client can understand
  // TBH, not really sure why this is necessary
  // copied from here -> https://github.com/snaplet/examples/tree/main/seed/supabase-twitter-clone
  const profiles: profilesScalars[] =
    dbProfiles?.map(profile => ({
      ...profile
    })) ?? [];

  await seed.questions(
    x => x(6, ({ index }) => ({ private: index % 2 === 0 })),
    { connect: { profiles } }
  );
  console.log('Profiles created: ', profiles);

  // Type completion not working? You might want to reload your TypeScript Server to pick up the changes
  process.exit();
};

main();
