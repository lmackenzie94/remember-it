import NarrowContainer from '@/components/NarrowContainer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <NarrowContainer>{children}</NarrowContainer>;
}
