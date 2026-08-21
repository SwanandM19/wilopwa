"use client";

import { useEffect, useRef, useState } from "react";

// Only shown when launched standalone (installed PWA), not for regular
// browser tab visits. Plays once per launch, then reveals the app.
export default function SplashScreen() {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

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

  // iOS Safari's `autoplay` attribute alone is unreliable right after an
  // installed PWA cold-launches — it sometimes leaves the video paused on
  // its first frame with a native play button instead of starting it. Kick
  // playback explicitly once the video has data, and skip the splash
  // entirely (rather than getting stuck) if the browser still refuses.
  useEffect(() => {
    if (!visible) return;
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;

    const tryPlay = () => {
      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => setClosing(true));
      }
    };

    if (video.readyState >= 2) {
      tryPlay();
    } else {
      video.addEventListener("loadeddata", tryPlay, { once: true });
      return () => video.removeEventListener("loadeddata", tryPlay);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] flex items-center justify-center bg-white transition-opacity duration-300 ${
        closing ? "opacity-0" : "opacity-100"
      }`}
    >
      <video
        ref={videoRef}
        src="/splash.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={() => setClosing(true)}
        onError={() => setClosing(true)}
        className="h-full w-full object-contain"
      />
    </div>
  );
}
