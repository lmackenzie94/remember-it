import { cn } from '@/utils';

export const H2 = ({
  children,
  className,
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h2
      className={cn('mb-10 text-4xl font-bold text-center', className)}
      {...rest}
    >
      {children}
    </h2>
  );
};
