'use client';

import { Label } from '@/src/components/ui/label';
import { Switch as ShadCNSwitch } from '@/src/components/ui/switch';

export function Switch({ id, label }: { id: string; label: string }) {
  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor={id}>{label}</Label>
      <ShadCNSwitch id={id} />
    </div>
  );
}
