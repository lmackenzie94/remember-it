import { GeistSans } from 'geist/font/sans';
import './globals.css';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import { createServerClient } from '@/utils/supabase/server';
import { ThemeProvider } from '@/src/components/ThemeProvider';
import { Toaster } from '@/components/ui/sonner';

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
  const supabase = createServerClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="flex flex-col items-center min-h-screen">
        {/* ThemProvider only works in the body */}
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Header user={user} />
          <main className="container flex-1">{children}</main>
          <Footer user={user} />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
