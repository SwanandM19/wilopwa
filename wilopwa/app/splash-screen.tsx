"use client";

import { useEffect, useState } from "react";

// Only shown when launched standalone (installed PWA), not for regular
// browser tab visits. Plays once per launch, then reveals the app.
export default function SplashScreen() {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const nav = window.navigator as Navigator & { standalone?: boolean };
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      nav.standalone === true;

    if (!isStandalone) {
      return;
    }

    // Third-party widgets (e.g. the chatbot's shadow-DOM host) render into
    // their own stacking context and ignore our overlay's z-index, so hide
    // them at the CSS level for as long as the splash is up.
    document.body.classList.add("splash-active");
    setVisible(true);

    // Fallback in case the video fails to load/play so the app never
    // gets stuck behind the splash screen.
    const fallback = window.setTimeout(() => setClosing(true), 4000);
    return () => window.clearTimeout(fallback);
  }, []);

  useEffect(() => {
    if (closing) {
      const timeout = window.setTimeout(() => {
        setVisible(false);
        document.body.classList.remove("splash-active");
      }, 300);
      return () => window.clearTimeout(timeout);
    }
  }, [closing]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] flex items-center justify-center bg-white transition-opacity duration-300 ${
        closing ? "opacity-0" : "opacity-100"
      }`}
    >
      <video
        src="/splash.mp4"
        autoPlay
        muted
        playsInline
        onEnded={() => setClosing(true)}
        onError={() => setClosing(true)}
        className="h-full w-full object-contain"
      />
    </div>
  );
}
