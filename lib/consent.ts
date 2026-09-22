"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "lor-cookie-consent";
const CHANGE_EVENT = "lor-consent-change";

export type ConsentValue = "accepted" | "rejected";

function getSnapshot(): ConsentValue | null {
  const v = window.localStorage.getItem(STORAGE_KEY);
  return v === "accepted" || v === "rejected" ? v : null;
}

function getServerSnapshot(): ConsentValue | null {
  return null;
}

function subscribe(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

/** Reads cookie consent from localStorage, synced across tabs and in-page updates. */
export function useConsent(): ConsentValue | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function setConsent(value: ConsentValue) {
  window.localStorage.setItem(STORAGE_KEY, value);
  window.dispatchEvent(new Event(CHANGE_EVENT));
}
