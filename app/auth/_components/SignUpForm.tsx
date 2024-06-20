import { signUp } from '@/app/actions';
import { SubmitButton } from './SubmitButton';

export default function SignUpForm() {
  return (
    <form
      action={signUp}
      className="flex flex-col gap-1 animate-fade-up-in bg-blue/10 dark:bg-blue/30 p-5 rounded-md"
    >
      <label className="text-sm" htmlFor="email">
        Email
      </label>
      <input
        className="px-4 py-2 mb-6 border rounded-md bg-white text-black"
        name="email"
        placeholder="you@example.com"
        required
      />
      <label className="text-sm" htmlFor="password">
        Password
      </label>
      <input
        className="px-4 py-2 mb-6 border rounded-md bg-white text-black"
        type="password"
        name="password"
        required
      />
      <label className="text-sm" htmlFor="display_name">
        Display Name
      </label>
      <input
        className="px-4 py-2 mb-6 border rounded-md bg-white text-black"
        name="display_name"
        placeholder="Jane Doe, jdoe94, etc."
        required
      />

      <SubmitButton variant="blue" pendingText="Signing Up...">
        Sign Up
      </SubmitButton>
    </form>
  );
}
