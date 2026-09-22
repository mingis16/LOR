"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";

export const WhatsAppWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const phoneNumber = "23290002000"; // Receptionist WhatsApp (+232 90 002000)

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const encodedMessage = encodeURIComponent(
      message.trim() || "Hello LÖR Receptionist, I have an inquiry regarding reservations/orders."
    );
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
    setMessage("");
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60] print:hidden flex flex-col items-end">
      {/* Pop-up Chat Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="mb-4 w-80 bg-[#121212] border border-[#d4af37]/40 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#1a1a1a] p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-[#25D366]/20 flex items-center justify-center border border-[#25D366]/40">
                    <MessageCircle className="w-5 h-5 text-[#25D366]" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#121212]"></span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">LÖR Receptionist</h4>
                  <p className="text-[11px] text-gray-400">Typically replies in minutes</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close WhatsApp chat"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="p-4 bg-[#0a0a0a]/90 space-y-3">
              <div className="bg-[#1a1a1a] p-3 rounded-2xl rounded-tl-none border border-white/5 text-xs text-gray-300 max-w-[85%]">
                Hello! 👋 Welcome to <strong className="text-[#d4af37]">LÖR Restaurant & Fitness</strong>. How can our team assist you today?
              </div>
            </div>

            {/* Quick Input Form */}
            <form onSubmit={handleSendMessage} className="p-3 bg-[#121212] border-t border-white/10 flex gap-2">
              <label htmlFor="whatsapp-quick-message" className="sr-only">
                Message to send on WhatsApp
              </label>
              <input
                id="whatsapp-quick-message"
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-[#1a1a1a] text-xs text-white placeholder-gray-500 rounded-xl px-3 py-2 border border-white/10 focus:outline-none focus:border-[#d4af37]"
              />
              <button
                type="submit"
                aria-label="Send message on WhatsApp"
                className="bg-[#25D366] hover:bg-[#20ba5a] text-black font-semibold p-2 rounded-xl transition-colors flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Trigger Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen((v) => !v)}
        className="relative bg-[#25D366] hover:bg-[#20ba5a] text-black p-4 rounded-full shadow-2xl flex items-center justify-center"
        aria-label={isOpen ? "Close WhatsApp chat" : "Chat with Receptionist on WhatsApp"}
      >
        <MessageCircle className="w-6 h-6 fill-black" />
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-black"></span>
        )}
      </motion.button>
    </div>
  );
};
