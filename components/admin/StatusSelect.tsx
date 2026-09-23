"use client";

import { useTransition } from "react";

export function StatusSelect<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: readonly T[];
  onChange: (next: T) => Promise<void>;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <select
      value={value}
      disabled={pending}
      onChange={(e) => {
        const next = e.target.value as T;
        startTransition(() => {
          onChange(next).catch(() => {
            // Server action already logs; the select will simply revert on
            // the next server-driven re-render if the update failed.
          });
        });
      }}
      className="rounded-lg border border-white/15 bg-white/5 px-2.5 py-1.5 text-xs capitalize text-white outline-none transition-colors focus:border-[#d4af37] disabled:opacity-50"
    >
      {options.map((opt) => (
        <option key={opt} value={opt} className="bg-[#0d0d0d] capitalize">
          {opt}
        </option>
      ))}
    </select>
  );
}
