import { buttonVariants } from '@/src/components/ui/button';
import Link from 'next/link';

export default function AuthNav() {
  return (
    <div className="flex gap-2">
      <Link href="/login" className={buttonVariants({ variant: 'green' })}>
        Login
      </Link>

      <Link href="/signup" className={buttonVariants({ variant: 'blue' })}>
        Sign Up
      </Link>
    </div>
  );
}
