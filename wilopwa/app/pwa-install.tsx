"use client";

import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function PwaInstall() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }

    const onBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
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
    setVisible(false);
    await deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
  };

  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex items-center gap-3 rounded-full bg-[#0067ac] px-5 py-3 shadow-lg">
      <span className="text-sm font-medium text-white">Install Wilo India app</span>
      <button
        type="button"
        onClick={handleInstall}
        className="rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-[#0067ac] transition-colors hover:bg-zinc-100"
      >
        Install
      </button>
      <button
        type="button"
        onClick={() => setVisible(false)}
        aria-label="Dismiss install prompt"
        className="text-white/80 hover:text-white"
      >
        ✕
      </button>
    </div>
  );
}
