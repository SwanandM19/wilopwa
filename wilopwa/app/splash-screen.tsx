"use client";

import { useEffect, useState } from "react";

// Only shown when launched standalone (installed PWA), not for regular
// browser tab visits. Plays a short logo-reveal animation, then reveals
// the app underneath.
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

    setVisible(true);

    const closeTimer = window.setTimeout(() => setClosing(true), 2200);
    return () => window.clearTimeout(closeTimer);
  }, []);

  useEffect(() => {
    if (closing) {
      const timeout = window.setTimeout(() => setVisible(false), 500);
      return () => window.clearTimeout(timeout);
    }
  }, [closing]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] flex items-center justify-center bg-gradient-to-br from-[#00b899] to-[#00664f] transition-opacity duration-500 ${
        closing ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="relative flex h-40 w-40 items-center justify-center">
        <span className="splash-ripple" style={{ animationDelay: "0s" }} />
        <span className="splash-ripple" style={{ animationDelay: "0.5s" }} />
        <span className="splash-ripple" style={{ animationDelay: "1s" }} />
        <img
          src="https://wilo.com/resources/v124/img/wilologo.png"
          alt="Wilo"
          className="splash-logo relative z-10 w-32"
        />
      </div>
    </div>
  );
}
