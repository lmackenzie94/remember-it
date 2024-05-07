import Link from 'next/link';
import AuthButton from './AuthButton';

export default function Header() {
  return (
    <header className="container flex items-center justify-between w-full py-6">
      <h1 className="text-2xl font-black text-pink-500">
        <Link href="/">Remember It!</Link>
      </h1>
      <AuthButton />
    </header>
  );
}
