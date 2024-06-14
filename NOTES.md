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
  insert into public.profiles (id, username)
  values (new.id, new.raw_user_meta_data->>'username');
  return new;
  end;
  $$ language plpgsql security definer;
  create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
  ```
