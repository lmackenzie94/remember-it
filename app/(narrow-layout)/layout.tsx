import NarrowContainer from '@/src/components/NarrowContainer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <NarrowContainer>{children}</NarrowContainer>;
}
