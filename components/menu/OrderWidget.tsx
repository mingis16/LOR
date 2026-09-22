"use client";

import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag, X, Minus, Plus, Trash2, AlertCircle } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatCurrency } from "@/lib/utils";
import { customerDetailsSchema } from "@/lib/validation";
import { Button } from "@/components/ui/Button";
import { OrderInvoice } from "@/components/receipts/OrderInvoice";
import { PaymentReceipt } from "@/components/receipts/PaymentReceipt";
import { PaymentSelector, type PaymentDetails } from "@/components/payments/PaymentSelector";
import type { OrderInvoiceData, PaymentMethod, PaymentReceiptData } from "@/lib/types";

type Step = "cart" | "details" | "payment" | "receipt";

const SERVICE_FEE_RATE = 0.02;

const PAYMENT_METHOD_LABEL: Record<PaymentMethod, "Mobile Money" | "Card" | "Pay on Pickup"> = {
  "orange-money": "Mobile Money",
  afrimoney: "Mobile Money",
  card: "Card",
  pickup: "Pay on Pickup",
};

// Maps PaymentSelector's method vocabulary onto the site-wide PaymentMethod type.
const PAYMENT_DETAILS_METHOD: Record<PaymentDetails["method"], PaymentMethod> = {
  orange_money: "orange-money",
  afrimoney: "afrimoney",
  card: "card",
  pay_on_pickup: "pickup",
};

export function OrderWidget() {
  const cart = useCart();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("cart");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [invoice, setInvoice] = useState<OrderInvoiceData | null>(null);
  const [receipt, setReceipt] = useState<PaymentReceiptData | null>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [website, setWebsite] = useState(""); // honeypot

  const serviceFee = useMemo(() => Math.round(cart.subtotal * SERVICE_FEE_RATE * 100) / 100, [cart.subtotal]);
  const total = cart.subtotal + serviceFee;

  const closeAll = () => {
    setOpen(false);
    setTimeout(() => {
      setStep("cart");
      setFormError(null);
    }, 300);
  };

  const handleDetailsSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const check = customerDetailsSchema.safeParse({ customerName: name, phone, email, pickupTime, website });
    if (!check.success) {
      setFormError(check.error.issues[0]?.message ?? "Please check your details and try again.");
      return;
    }
    setStep("payment");
  };

  const handlePaymentComplete = async (details: PaymentDetails) => {
    setFormError(null);
    setSubmitting(true);

    const paymentMethod = PAYMENT_DETAILS_METHOD[details.method];
    const payerReference = details.method === "card" ? details.cardNumber : details.phoneNumber;

    try {
      const orderRes = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: name,
          phone,
          email,
          pickupTime,
          paymentMethod,
          lines: cart.lines.map((l) => ({ itemId: l.item.id, quantity: l.quantity })),
          website,
        }),
      });
      const orderData = await orderRes.json();
      if (!orderRes.ok) {
        throw new Error(orderData.error ?? "Could not place your order. Please try again.");
      }

      let finalInvoice: OrderInvoiceData = orderData.invoice;

      if (paymentMethod !== "pickup") {
        const paymentRes = await fetch("/api/payments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId: finalInvoice.orderId,
            amount: finalInvoice.total,
            method: paymentMethod,
            customerName: name,
            phone,
            payerReference,
            website,
          }),
        });
        const paymentData = await paymentRes.json();
        if (!paymentRes.ok) {
          throw new Error(paymentData.error ?? "Payment failed. Please try again.");
        }
        setReceipt(paymentData.receipt);
        finalInvoice = { ...finalInvoice, status: "paid" };
      }

      setInvoice(finalInvoice);
      setStep("receipt");
      cart.clearCart();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStep("payment");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label={`Open cart, ${cart.itemCount} items`}
        className="fixed bottom-5 left-5 z-[60] flex items-center gap-2 rounded-full bg-[#d4af37] px-5 py-3.5 font-semibold text-[#0a0a0a] shadow-[0_8px_24px_rgba(212,175,55,0.35)] transition-transform hover:scale-105 sm:bottom-8 sm:left-8"
      >
        <ShoppingBag size={20} />
        {cart.itemCount > 0 && (
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0a0a0a] text-xs text-[#d4af37]">
            {cart.itemCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeAll}
              className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col overflow-y-auto bg-[#0a0a0a] p-6 shadow-2xl print:static print:h-auto print:w-auto print:max-w-none print:p-0"
            >
              <div className="flex items-center justify-between print:hidden">
                <h2 className="font-serif text-xl font-semibold text-white">
                  {step === "cart" && "Your Order"}
                  {step === "details" && "Your Details"}
                  {step === "payment" && "Payment"}
                  {step === "receipt" && "Order Confirmed"}
                </h2>
                <button
                  onClick={closeAll}
                  aria-label="Close cart"
                  className="rounded-full p-2 text-white/60 hover:bg-white/10 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              {step === "cart" && (
                <div className="mt-6 flex flex-1 flex-col">
                  {cart.lines.length === 0 ? (
                    <p className="mt-10 text-center text-white/50">Your cart is empty. Browse the menu to add items.</p>
                  ) : (
                    <>
                      <div className="flex-1 space-y-4">
                        {cart.lines.map((line) => (
                          <div key={line.item.id} className="flex items-start justify-between gap-3 border-b border-white/10 pb-4">
                            <div>
                              <p className="font-medium text-white">{line.item.name}</p>
                              <p className="text-sm text-white/50">{formatCurrency(line.item.price)}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => cart.updateQuantity(line.item.id, line.quantity - 1)}
                                aria-label={`Decrease quantity of ${line.item.name}`}
                                className="rounded-full border border-white/15 p-1.5 text-white/70 hover:border-[#d4af37]"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="w-6 text-center text-white">{line.quantity}</span>
                              <button
                                onClick={() => cart.updateQuantity(line.item.id, line.quantity + 1)}
                                aria-label={`Increase quantity of ${line.item.name}`}
                                className="rounded-full border border-white/15 p-1.5 text-white/70 hover:border-[#d4af37]"
                              >
                                <Plus size={14} />
                              </button>
                              <button
                                onClick={() => cart.removeItem(line.item.id)}
                                aria-label={`Remove ${line.item.name}`}
                                className="ml-1 rounded-full p-1.5 text-white/40 hover:text-red-400"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 space-y-1 border-t border-white/10 pt-4">
                        <div className="flex justify-between text-sm text-white/60">
                          <span>Subtotal</span>
                          <span>{formatCurrency(cart.subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-white/60">
                          <span>Service Fee (2%)</span>
                          <span>{formatCurrency(serviceFee)}</span>
                        </div>
                        <div className="flex justify-between text-base font-semibold text-white">
                          <span>Total</span>
                          <span>{formatCurrency(total)}</span>
                        </div>
                      </div>
                      <Button size="lg" className="mt-6 w-full" onClick={() => setStep("details")}>
                        Proceed to Checkout
                      </Button>
                    </>
                  )}
                </div>
              )}

              {step === "details" && (
                <form className="mt-6 flex flex-1 flex-col gap-4" onSubmit={handleDetailsSubmit}>
                  {/* Honeypot field — hidden from real users, bots often fill it */}
                  <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
                    <label htmlFor="website">Leave this field empty</label>
                    <input
                      id="website"
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </div>

                  <Field label="Full Name" htmlFor="order-name">
                    <input
                      id="order-name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={inputClass}
                      placeholder="Jane Doe"
                    />
                  </Field>
                  <Field label="Phone Number" htmlFor="order-phone">
                    <input
                      id="order-phone"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={inputClass}
                      placeholder="076 123456"
                      inputMode="tel"
                    />
                  </Field>
                  <Field label="Email (optional)" htmlFor="order-email">
                    <input
                      id="order-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={inputClass}
                      placeholder="jane@example.com"
                    />
                  </Field>
                  <Field label="Pickup Time" htmlFor="order-time">
                    <input
                      id="order-time"
                      required
                      type="time"
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      className={inputClass}
                    />
                  </Field>

                  {formError && (
                    <div className="flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
                      <AlertCircle size={16} className="mt-0.5 shrink-0" />
                      {formError}
                    </div>
                  )}

                  <div className="mt-2 flex gap-3">
                    <Button type="button" variant="ghost" size="md" onClick={() => setStep("cart")} className="flex-1">
                      Back
                    </Button>
                    <Button type="submit" size="md" className="flex-1">
                      Continue to Payment
                    </Button>
                  </div>
                </form>
              )}

              {step === "payment" && (
                <div className="mt-6 flex flex-1 flex-col gap-4">
                  <PaymentSelector totalAmount={total} onPaymentComplete={handlePaymentComplete} />

                  {formError && (
                    <div className="flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
                      <AlertCircle size={16} className="mt-0.5 shrink-0" />
                      {formError}
                    </div>
                  )}

                  <Button
                    type="button"
                    variant="ghost"
                    size="md"
                    onClick={() => setStep("details")}
                    disabled={submitting}
                  >
                    Back
                  </Button>
                  {submitting && <p className="text-center text-sm text-white/50">Processing your order…</p>}
                </div>
              )}

              {step === "receipt" && invoice && (
                <div className="mt-6 flex flex-1 flex-col items-center gap-6">
                  <OrderInvoice
                    orderId={invoice.orderId}
                    customerName={invoice.customer.name}
                    phone={invoice.customer.phone}
                    items={invoice.lines.map((l) => ({ id: l.id, name: l.name, quantity: l.quantity, price: l.price }))}
                    subtotal={invoice.subtotal}
                    tax={invoice.serviceFee}
                    total={invoice.total}
                    pickupTime={invoice.pickupTime}
                    paymentMethod={PAYMENT_METHOD_LABEL[invoice.paymentMethod]}
                    paymentStatus={invoice.status === "paid" ? "PAID" : "PENDING"}
                    transactionRef={receipt?.transactionRef}
                    onClose={closeAll}
                  />
                  {receipt && <PaymentReceipt data={receipt} />}
                  <Button size="md" onClick={closeAll} className="print:hidden">
                    Done
                  </Button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

const inputClass =
  "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-[#d4af37]";

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-white/80">
        {label}
      </label>
      {children}
    </div>
  );
}
