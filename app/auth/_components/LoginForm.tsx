import { login } from '@/app/actions';
import { SubmitButton } from './SubmitButton';

export default function LoginForm() {
  return (
    <form
      action={login}
      className="flex flex-col gap-1 animate-fade-up-in bg-green/10 dark:bg-green/30 p-5 rounded-md"
    >
      <label className="text-sm" htmlFor="email">
        Email
      </label>
      <input
        className="px-4 py-2 mb-5 border rounded-md bg-white text-black"
        name="email"
        placeholder="you@example.com"
        required
      />
      <label className="text-sm" htmlFor="password">
        Password
      </label>
      <input
        className="px-4 py-2 mb-5 border rounded-md bg-white text-black"
        type="password"
        name="password"
        required
      />

      <SubmitButton variant="green" pendingText="Signing In...">
        Sign In
      </SubmitButton>
    </form>
  );
}
