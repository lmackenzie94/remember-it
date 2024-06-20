'use client';

import { useFormStatus } from 'react-dom';
import { type ComponentProps } from 'react';
import { Button } from '@/components/ui/button';

type Props = ComponentProps<'button'> & {
  pendingText: string;
  variant?: 'green' | 'blue';
};

export function SubmitButton({
  children,
  pendingText,
  variant,
  ...props
}: Props) {
  // const { pending, action } = useFormStatus();
  const { pending } = useFormStatus();

  return (
    // @ts-ignore - TODO: fix this ({...props} is causing an error)
    <Button
      variant={variant}
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      {...props}
    >
      {pending ? pendingText : children}
    </Button>
  );
}
