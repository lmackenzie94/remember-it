# Notes

**Deployed to [Vercel](https://vercel.com/luke-mackenzies-projects/remember-it):**

https://remember-it-beta.vercel.app/

---

- created via `npx create-next-app -e with-supabase`
- a new "profile" is automatically created when a new user signs up (via "trigger") which references the user's "id" via a foreign key
  - see [Supabase SQL Editor](https://supabase.com/dashboard/project/nohpbrvyisemxhxywhca/sql/7f86bd4e-c6d5-45a7-b2af-503c48fb9006)
  ```sql
  create function public.handle_new_user()
  returns trigger as $$
  begin
  insert into public.profiles (id, display_name)
  values (new.id, new.raw_user_meta_data->>'user_display_name');
  return new;
  end;
  $$ language plpgsql security definer;
  create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
  ```

## Local Development

1. `npx supabase login`
2. Open Docker Desktop
3. `npx supabase start`
4. See console output containing your local Supabase credentials
5. Local Dashboard: `http://localhost:54323/`
6. Sync with remote Supabase project (assuming you have one): `npx supabase link --project-ref <project-id>`

### Generating seed data

**THIS IS ONLY KINDA WORKING....**

- had to remove `{dryRun: true}` from createSeedClient() because we want to execute the seeding, not copy to SQL statements to `seed.sql`
- also, this way the `seed.sql` file isn't actually being used which maybe isn't ideal?
- to seed, run `npx tsx seed.ts`

- https://supabase.com/docs/guides/cli/seeding-your-database

1. use [Snaplet](https://www.snaplet.dev/): "Instant seed data for your relational database"
2. `npx @snaplet/seed init` (select the Postgres adapter)
3. Whenever your database structure changes, @snaplet/seed will need to be regenerated so that it is
   in sync with your new database structure. You can do this by running `npx @snaplet/seed sync`.
4. (Optional) Customize your AI-generated data using our Data Generator: https://app.snaplet.dev/o/clxm8g5ksibgelyr8rm93waqu/p/clxm8g5ksibgflyr8uqwietfc/seed
5. Running `npx tsx seed.ts > supabase/seed.sql` generates the relevant SQL statements inside your `supabase/seed.sql` file.
   - The `seed.sql` file is run every time you run `supabase start` or `supabase db reset`
