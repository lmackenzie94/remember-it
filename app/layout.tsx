import { GeistSans } from 'geist/font/sans';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Next.js and Supabase Starter Kit',
  description: 'The fastest way to build apps with Next.js and Supabase'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="flex flex-col items-center min-h-screen bg-background text-foreground">
        <Header />
        <main className="container flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
