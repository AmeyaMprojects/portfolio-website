import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";

// The production build is prerendered (see scripts/prerender.mjs), so
// crawlers get real markup on the raw HTML response. The client still does
// a normal fresh render rather than hydrating over that markup: several
// components (Footer, Navbar, ThemeToggle) gate theme-dependent output
// behind a `mounted` check that flips true almost immediately after mount —
// by the time the prerender snapshot is captured, that check has already
// resolved, so the snapshot reflects post-mount state while a real
// hydration's first pass always starts pre-mount. That mismatch is
// unavoidable with a post-render snapshot (as opposed to true SSR, which
// never runs client effects at all), so we don't attempt to reconcile
// against it — createRoot replaces it with a clean client render instead.
createRoot(document.getElementById("root")!).render(<App />);
