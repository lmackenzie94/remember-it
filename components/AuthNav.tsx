import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

export default function AuthNav() {
  return (
    <Link href="/auth" className={buttonVariants({ variant: 'green' })}>
      Login
    </Link>
  );
}
