import Link from 'next/link';

export default function AuthNav() {
  return (
    <div className="flex gap-2">
      <Link
        href="/login"
        className="flex px-3 py-2 font-semibold text-white no-underline bg-blue-500 rounded-md hover:bg-blue-600"
      >
        Login
      </Link>

      <Link
        href="/signup"
        className="flex px-3 py-2 font-semibold text-white no-underline bg-green-500 rounded-md hover:bg-green-600"
      >
        Sign Up
      </Link>
    </div>
  );
}
