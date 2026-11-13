// Icon shape: A@{ icon, form, label, pos, h } with icons from an inline Iconify pack (no fetch)
import type { Mount } from '@/types.ts';
import type { IconLoader } from 'mermaid';
import { playground } from '../../shared/playground.ts';
import { mermaid } from '../../shared/setup.ts';

// The icon shape needs a registered pack (flowchart.md § Icon Shape). Passing the Iconify
// JSON object directly keeps it offline. The name `shapeicons` is what the diagrams write.
const PACK: IconLoader = {
  name: 'shapeicons',
  icons: {
    prefix: 'shapeicons',
    width: 24,
    height: 24,
    icons: {
      user: { body: '<circle cx="12" cy="7" r="4" fill="#c4b5fd"/><path fill="#8b5cf6" d="M4 21c0-5 3.5-8 8-8s8 3 8 8z"/>' },
      server: { body: '<path fill="#94a3b8" d="M3 3h18v7H3zM3 13h18v7H3z"/><circle cx="7" cy="6.5" r="1.2" fill="#22c55e"/><circle cx="7" cy="16.5" r="1.2" fill="#22c55e"/>' },
      db: { body: '<ellipse cx="12" cy="6" rx="8" ry="3" fill="#38bdf8"/><path fill="#0ea5e9" d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6c0 1.7-3.6 3-8 3S4 7.7 4 6z"/>' },
      bell: { body: '<path fill="#facc15" d="M12 2a6 6 0 0 0-6 6v5l-2 3h16l-2-3V8a6 6 0 0 0-6-6z"/><path fill="#f59e0b" d="M10 19h4a2 2 0 0 1-4 0z"/>' },
    },
  },
};

// Registration is page-wide and permanent, so do it once however many times this mounts.
let registered = false;
function ensurePack(): void {
  if (registered) return;
  registered = true;
  mermaid.registerIconPacks([PACK]);
}

// Just icon and label: with no form there is no background behind the icon.
const BARE = `flowchart LR
    a@{ icon: "shapeicons:user", label: "Visitor" }
    b@{ icon: "shapeicons:server", label: "Web server" }
    c@{ icon: "shapeicons:db", label: "Database" }
    a --> b --> c`;

// form picks the background: square, circle or rounded.
const FORMS = `flowchart LR
    a@{ icon: "shapeicons:user", form: "square", label: "square" }
    b@{ icon: "shapeicons:user", form: "circle", label: "circle" }
    c@{ icon: "shapeicons:user", form: "rounded", label: "rounded" }
    a --> b --> c`;

// pos puts the label on top (t) or at the bottom (b, the default); h sets the icon height (48 is the minimum).
const POSITION = `flowchart TD
    a@{ icon: "shapeicons:bell", form: "circle", label: "Label on top", pos: "t", h: 60 }
    b@{ icon: "shapeicons:bell", form: "circle", label: "Label below (default)", pos: "b", h: 60 }
    c@{ icon: "shapeicons:bell", form: "rounded", label: "Large, h: 90", h: 90 }
    a --> b --> c`;

// Icon nodes mix with ordinary nodes and links.
const MIXED = `flowchart LR
    user@{ icon: "shapeicons:user", form: "circle", label: "Customer", pos: "t", h: 56 }
    api[API gateway]
    srv@{ icon: "shapeicons:server", form: "rounded", label: "Service", h: 56 }
    store@{ icon: "shapeicons:db", form: "square", label: "Store", h: 56 }
    user -->|HTTPS| api --> srv
    srv -->|SQL| store
    srv -.->|alert| alarm@{ icon: "shapeicons:bell", label: "On-call" }`;

const mount: Mount = (el, ctx) => {
  ensurePack();
  return playground(el, ctx, {
    variants: [
      { label: 'Icon and label', code: BARE },
      { label: 'form', code: FORMS },
      { label: 'pos and h', code: POSITION },
      { label: 'Mixed with nodes', code: MIXED },
    ],
  });
};

export default mount;
