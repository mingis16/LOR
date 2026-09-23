"use client";

import { useState, useTransition } from "react";
import { Plus, Trash2, Pencil, X, Check, Loader2 } from "lucide-react";
import { upsertGymClass, deleteGymClass, type GymClassFormInput } from "@/app/admin/actions";
import type { GymClassTypeDb } from "@/lib/supabase/database.types";
import { slugify } from "@/lib/utils";

const TYPES: GymClassTypeDb[] = ["HIIT", "Strength", "Yoga"];

type ClassRow = GymClassFormInput;

const EMPTY: Omit<ClassRow, "id"> = {
  name: "",
  type: "HIIT",
  day: "Monday",
  time: "",
  instructor: "",
  spots: 12,
  sortOrder: 0,
};

const inputClass =
  "w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none transition-colors focus:border-[#d4af37]";

function Field({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <label className="mb-1 block text-xs font-medium text-white/60">{label}</label>
      {children}
    </div>
  );
}

function ClassForm({
  initial,
  isNew,
  onCancel,
  onSaved,
}: {
  initial: ClassRow;
  isNew?: boolean;
  onCancel: () => void;
  onSaved: (cls: ClassRow) => void;
}) {
  const [form, setForm] = useState<ClassRow>(initial);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const save = () => {
    setError(null);
    const id = isNew ? form.id || slugify(`${form.name}-${form.day}`) : form.id;
    if (!id || !form.name || !form.time || !form.instructor) {
      setError("Name, time, and instructor are required.");
      return;
    }
    const payload = { ...form, id };
    startTransition(async () => {
      try {
        await upsertGymClass(payload);
        onSaved(payload);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to save.");
      }
    });
  };

  return (
    <div className="rounded-2xl border border-[#d4af37]/40 bg-[#d4af37]/[0.04] p-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {isNew && (
          <Field label="ID (slug)">
            <input
              value={form.id ?? ""}
              onChange={(e) => setForm((f) => ({ ...f, id: e.target.value }))}
              placeholder="auto-generated if left blank"
              className={inputClass}
            />
          </Field>
        )}
        <Field label="Class name">
          <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className={inputClass} />
        </Field>
        <Field label="Type">
          <select value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as GymClassTypeDb }))} className={inputClass}>
            {TYPES.map((t) => (
              <option key={t} value={t} className="bg-[#0d0d0d]">
                {t}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Day">
          <input value={form.day} onChange={(e) => setForm((f) => ({ ...f, day: e.target.value }))} className={inputClass} />
        </Field>
        <Field label="Time">
          <input
            value={form.time}
            onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))}
            placeholder="6:00 AM"
            className={inputClass}
          />
        </Field>
        <Field label="Instructor">
          <input value={form.instructor} onChange={(e) => setForm((f) => ({ ...f, instructor: e.target.value }))} className={inputClass} />
        </Field>
        <Field label="Spots">
          <input
            type="number"
            min={1}
            value={form.spots}
            onChange={(e) => setForm((f) => ({ ...f, spots: Number(e.target.value) }))}
            className={inputClass}
          />
        </Field>
        <Field label="Sort order">
          <input
            type="number"
            value={form.sortOrder}
            onChange={(e) => setForm((f) => ({ ...f, sortOrder: Number(e.target.value) }))}
            className={inputClass}
          />
        </Field>
      </div>

      {error && <p className="mt-3 text-sm text-red-300">{error}</p>}

      <div className="mt-4 flex gap-2">
        <button
          onClick={save}
          disabled={pending}
          className="flex items-center gap-1.5 rounded-full bg-[#d4af37] px-4 py-2 text-xs font-semibold text-black hover:bg-[#e8c454] disabled:opacity-50"
        >
          {pending ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />} Save
        </button>
        <button onClick={onCancel} className="flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-xs text-white/70 hover:text-white">
          <X size={14} /> Cancel
        </button>
      </div>
    </div>
  );
}

export function GymClassesManager({ classes: initialClasses }: { classes: ClassRow[] }) {
  const [classes, setClasses] = useState(initialClasses);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [deletingId, startDelete] = useTransition();

  const handleDelete = (id: string) => {
    if (!confirm("Delete this class? This can't be undone.")) return;
    startDelete(async () => {
      await deleteGymClass(id);
      setClasses((prev) => prev.filter((c) => c.id !== id));
    });
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-white/50">{classes.length} classes</p>
        {!adding && (
          <button
            onClick={() => setAdding(true)}
            className="flex items-center gap-1.5 rounded-full border border-[#d4af37]/50 px-4 py-2 text-xs font-semibold text-[#d4af37] hover:bg-[#d4af37]/10"
          >
            <Plus size={14} /> Add Class
          </button>
        )}
      </div>

      {adding && (
        <div className="mb-4">
          <ClassForm
            initial={{ id: "", ...EMPTY, sortOrder: classes.length * 10 + 10 }}
            isNew
            onCancel={() => setAdding(false)}
            onSaved={(cls) => {
              setClasses((prev) => [...prev, cls]);
              setAdding(false);
            }}
          />
        </div>
      )}

      <div className="space-y-3">
        {classes.map((cls) =>
          editingId === cls.id ? (
            <ClassForm
              key={cls.id}
              initial={cls}
              onCancel={() => setEditingId(null)}
              onSaved={(updated) => {
                setClasses((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
                setEditingId(null);
              }}
            />
          ) : (
            <div key={cls.id} className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-wider text-[#d4af37]">{cls.type}</p>
                <p className="truncate font-medium text-white">{cls.name}</p>
                <p className="text-xs text-white/40">
                  {cls.day} &middot; {cls.time} &middot; {cls.instructor}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button onClick={() => setEditingId(cls.id)} className="rounded-full border border-white/15 p-2 text-white/60 hover:text-white">
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() => handleDelete(cls.id)}
                  disabled={deletingId}
                  className="rounded-full border border-white/15 p-2 text-white/60 hover:border-red-400 hover:text-red-400 disabled:opacity-50"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          )
        )}
        {classes.length === 0 && !adding && <p className="text-sm text-white/40">No classes yet.</p>}
      </div>
    </div>
  );
}
