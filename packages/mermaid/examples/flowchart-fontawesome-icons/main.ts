// fa: and fab: icons in flowchart node text, backed by FontAwesome 6 packs registered as lazy bundled loaders
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { mermaid } from '../../shared/setup.ts';

// flowchart.md § Register FontAwesome icon packs: the supported prefixes are fa, fab, fas,
// far, fal and fad. The pack name given here replaces the Iconify prefix, so the solid set
// answers to both `fa` and `fas` and the brands set to `fab`. The loader form
// (icons.md § With lazy loading) fetches nothing from a CDN; the pack is a bundler chunk
// that loads the first time a diagram uses its prefix.
let registered = false;
function ensurePacks(): void {
  if (registered) return;
  registered = true;
  const solid = () => import('@iconify-json/fa6-solid').then((m) => m.icons);
  mermaid.registerIconPacks([
    { name: 'fa', loader: solid },
    { name: 'fas', loader: solid },
    { name: 'fab', loader: () => import('@iconify-json/fa6-brands').then((m) => m.icons) },
  ]);
}

// The documented form, fa:fa-<name>, inside node text: icons sit inline with the words.
const SOLID = `flowchart TD
    B["fa:fa-user A visitor arrives"]
    B --> C[fa:fa-ban forbidden]
    B --> D(fa:fa-spinner)
    B --> E(A fa:fa-camera-retro perhaps?)`;

// fab: is the brands prefix; fas: is an explicit spelling of the solid set.
const BRANDS = `flowchart LR
    S["fas:fa-code Source"] --> G["fab:fa-github Repository"]
    G --> D["fab:fa-docker Image"]
    D --> L["fab:fa-linux Server"]
    L --> N["fas:fa-bell Notify"]`;

// Icons in edge labels and quoted text, next to ordinary words.
const MIXED = `flowchart LR
    A["fa:fa-lock Login"] -->|"fa:fa-key token"| B{"fa:fa-shield-halved Valid?"}
    B -->|yes| C["fa:fa-house Home"]
    B -->|no| D["fa:fa-triangle-exclamation Try again"]`;

const mount: Mount = (el, ctx) => {
  ensurePacks();
  return playground(el, ctx, {
    variants: [
      { label: 'fa: solid icons', code: SOLID },
      { label: 'fab: brands', code: BRANDS },
      { label: 'In edge labels', code: MIXED },
    ],
  });
};

export default mount;
