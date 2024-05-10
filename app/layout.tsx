import { GeistSans } from 'geist/font/sans';
import './globals.css';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import { createClient } from '@/utils/supabase/server';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Remember It',
  description: 'For things you want to remember'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  return (
    <html lang="en" className={GeistSans.className}>
      <body className="flex flex-col items-center min-h-screen bg-background text-foreground">
        <Header user={user} />
        <main className="container flex-1">{children}</main>
        <Footer user={user} />
      </body>
    </html>
  );
}
