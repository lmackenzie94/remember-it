'use client';

import { useFormStatus } from 'react-dom';
import { type ComponentProps } from 'react';
import { Button } from '@/components/ui/button';

type Props = ComponentProps<'button'> & {
  pendingText?: string;
  variant?: 'green' | 'blue';
};

export function SubmitButton({
  children,
  pendingText,
  variant,
  ...props
}: Props) {
  const { pending, action } = useFormStatus();

  const isPending = pending && action === props.formAction;

  return (
    <Button variant={variant} type="submit" aria-disabled={pending} {...props}>
      {isPending ? pendingText : children}
    </Button>
  );
}
