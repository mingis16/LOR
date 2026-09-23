"use client";

import { useState, useTransition } from "react";
import { Plus, Trash2, Pencil, X, Check, Loader2 } from "lucide-react";
import { upsertMenuItem, deleteMenuItem, type MenuItemFormInput } from "@/app/admin/actions";
import type { MenuCategoryDb } from "@/lib/supabase/database.types";
import { formatCurrency, slugify } from "@/lib/utils";

const CATEGORIES: MenuCategoryDb[] = ["Appetizers", "Mains", "Cocktails", "Shisha & Lounge"];

type MenuItemRow = MenuItemFormInput;

const EMPTY: Omit<MenuItemRow, "id"> = {
  category: "Appetizers",
  name: "",
  description: "",
  price: 0,
  image: "",
  spicy: false,
  vegetarian: false,
  popular: false,
  sortOrder: 0,
};

function ItemForm({
  initial,
  isNew,
  onCancel,
  onSaved,
}: {
  initial: MenuItemRow;
  isNew?: boolean;
  onCancel: () => void;
  onSaved: (item: MenuItemRow) => void;
}) {
  const [form, setForm] = useState<MenuItemRow>(initial);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const save = () => {
    setError(null);
    const id = isNew ? form.id || slugify(form.name) : form.id;
    if (!id || !form.name || !form.image) {
      setError("Name, image path, and id are required.");
      return;
    }
    const payload = { ...form, id };
    startTransition(async () => {
      try {
        await upsertMenuItem(payload);
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
              placeholder="auto-generated from name if left blank"
              className={inputClass}
            />
          </Field>
        )}
        <Field label="Category">
          <select
            value={form.category}
            onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as MenuCategoryDb }))}
            className={inputClass}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c} className="bg-[#0d0d0d]">
                {c}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Name">
          <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className={inputClass} />
        </Field>
        <Field label="Price (SLE)">
          <input
            type="number"
            min={0}
            step="0.01"
            value={form.price}
            onChange={(e) => setForm((f) => ({ ...f, price: Number(e.target.value) }))}
            className={inputClass}
          />
        </Field>
        <Field label="Image path" className="sm:col-span-2">
          <input
            value={form.image}
            onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
            placeholder="/images/restaurant/dish-example.jpg"
            className={inputClass}
          />
        </Field>
        <Field label="Description" className="sm:col-span-2">
          <textarea
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            rows={2}
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
        <div className="flex items-center gap-4 pt-6 text-sm text-white/70">
          {(["spicy", "vegetarian", "popular"] as const).map((flag) => (
            <label key={flag} className="flex items-center gap-1.5 capitalize">
              <input
                type="checkbox"
                checked={form[flag]}
                onChange={(e) => setForm((f) => ({ ...f, [flag]: e.target.checked }))}
              />
              {flag}
            </label>
          ))}
        </div>
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

function Field({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <label className="mb-1 block text-xs font-medium text-white/60">{label}</label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none transition-colors focus:border-[#d4af37]";

export function MenuItemsManager({ items: initialItems }: { items: MenuItemRow[] }) {
  const [items, setItems] = useState(initialItems);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [deletingId, startDelete] = useTransition();

  const handleDelete = (id: string) => {
    if (!confirm("Delete this menu item? This can't be undone.")) return;
    startDelete(async () => {
      await deleteMenuItem(id);
      setItems((prev) => prev.filter((i) => i.id !== id));
    });
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-white/50">{items.length} menu items</p>
        {!adding && (
          <button
            onClick={() => setAdding(true)}
            className="flex items-center gap-1.5 rounded-full border border-[#d4af37]/50 px-4 py-2 text-xs font-semibold text-[#d4af37] hover:bg-[#d4af37]/10"
          >
            <Plus size={14} /> Add Item
          </button>
        )}
      </div>

      {adding && (
        <div className="mb-4">
          <ItemForm
            initial={{ id: "", ...EMPTY, sortOrder: items.length * 10 + 10 }}
            isNew
            onCancel={() => setAdding(false)}
            onSaved={(item) => {
              setItems((prev) => [...prev, item]);
              setAdding(false);
            }}
          />
        </div>
      )}

      <div className="space-y-3">
        {items.map((item) =>
          editingId === item.id ? (
            <ItemForm
              key={item.id}
              initial={item}
              onCancel={() => setEditingId(null)}
              onSaved={(updated) => {
                setItems((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
                setEditingId(null);
              }}
            />
          ) : (
            <div key={item.id} className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-wider text-[#d4af37]">{item.category}</p>
                <p className="truncate font-medium text-white">{item.name}</p>
                <p className="text-xs text-white/40">{formatCurrency(item.price)} &middot; {item.id}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button onClick={() => setEditingId(item.id)} className="rounded-full border border-white/15 p-2 text-white/60 hover:text-white">
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  disabled={deletingId}
                  className="rounded-full border border-white/15 p-2 text-white/60 hover:border-red-400 hover:text-red-400 disabled:opacity-50"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          )
        )}
        {items.length === 0 && !adding && <p className="text-sm text-white/40">No menu items yet.</p>}
      </div>
    </div>
  );
}
