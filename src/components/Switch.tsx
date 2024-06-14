'use client';

import { Label } from '@/components/ui/label';
import { Switch as ShadCNSwitch } from '@/components/ui/switch';

export function Switch({ id, label }: { id: string; label: string }) {
  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor={id}>{label}</Label>
      <ShadCNSwitch id={id} />
    </div>
  );
}
