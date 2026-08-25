import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";

const container = document.getElementById("root")!;

// The production build is prerendered (see scripts/prerender.mjs) so real
// markup ships on first response; hydrate over it instead of wiping and
// remounting. Dev server has no prerendered markup to reconcile against.
if (container.hasChildNodes()) {
  hydrateRoot(container, <App />);
} else {
  createRoot(container).render(<App />);
}
