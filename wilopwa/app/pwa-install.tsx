"use client";

import { useCallback, useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

// Dismissing only suppresses the prompt for the rest of this browser tab's
// session (sessionStorage), not across visits.
const DISMISS_KEY = "wilo-pwa-install-dismissed-session-v3";

export default function PwaInstall() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);

  const dismiss = useCallback(() => {
    setVisible(false);
    try {
      window.sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // Ignore storage errors (e.g. private mode)
    }
  }, []);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }

    const nav = window.navigator as Navigator & { standalone?: boolean };
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      nav.standalone === true;

    if (isStandalone) {
      return;
    }

    const onBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();

      try {
        if (window.sessionStorage.getItem(DISMISS_KEY)) {
          return;
        }
      } catch {
        // Ignore storage errors
      }

      setDeferredPrompt(event as BeforeInstallPromptEvent);
      setVisible(true);
    };

    const onInstalled = () => {
      setVisible(false);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (!visible || !deferredPrompt) return null;

  const handleInstall = async () => {
    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") setVisible(false);
      setDeferredPrompt(null);
    } catch {
      setVisible(false);
      setDeferredPrompt(null);
    }
  };

  return (
    <div className="pwa-install-in fixed right-5 top-[76px] z-[9999] w-[310px] max-w-[calc(100vw-24px)]">
      <div
        role="dialog"
        aria-label="Install Wilo India app"
        className="relative overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
      >
        <div className="h-[3px] w-full bg-[#009879]" />

        <div className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-neutral-200 bg-white">
              <img
                src="/web-app-manifest-192x192.png"
                alt="Wilo India"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="min-w-0 flex-1 pr-5">
              <p className="text-[14px] font-semibold leading-tight text-neutral-900">
                Install Wilo India
              </p>
              <p className="mt-1 text-[12px] leading-[1.45] text-neutral-500">
                Get quick access to Wilo India from your home screen.
              </p>
            </div>

            <button
              type="button"
              onClick={dismiss}
              aria-label="Close"
              className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-700"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path
                  d="M2 2L12 12M12 2L2 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <div className="mt-4 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={dismiss}
              className="rounded-md px-3 py-2 text-[12px] font-medium text-neutral-600 transition hover:bg-neutral-100"
            >
              Not now
            </button>

            <button
              type="button"
              onClick={handleInstall}
              className="rounded-md bg-[#009879] px-4 py-2 text-[12px] font-semibold text-white transition hover:bg-[#007f66] active:scale-[0.98]"
            >
              Install app
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
