"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { CartLine, MenuItem } from "./types";

interface CartContextValue {
  lines: CartLine[];
  addItem: (item: MenuItem, quantity?: number) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  const addItem = useCallback((item: MenuItem, quantity = 1) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.item.id === item.id);
      if (existing) {
        return prev.map((l) =>
          l.item.id === item.id ? { ...l, quantity: Math.min(l.quantity + quantity, 20) } : l
        );
      }
      return [...prev, { item, quantity: Math.min(quantity, 20) }];
    });
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    setLines((prev) => {
      if (quantity <= 0) return prev.filter((l) => l.item.id !== itemId);
      return prev.map((l) => (l.item.id === itemId ? { ...l, quantity: Math.min(quantity, 20) } : l));
    });
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setLines((prev) => prev.filter((l) => l.item.id !== itemId));
  }, []);

  const clearCart = useCallback(() => setLines([]), []);

  const itemCount = useMemo(() => lines.reduce((sum, l) => sum + l.quantity, 0), [lines]);
  const subtotal = useMemo(() => lines.reduce((sum, l) => sum + l.quantity * l.item.price, 0), [lines]);

  const value = useMemo(
    () => ({ lines, addItem, updateQuantity, removeItem, clearCart, itemCount, subtotal }),
    [lines, addItem, updateQuantity, removeItem, clearCart, itemCount, subtotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
