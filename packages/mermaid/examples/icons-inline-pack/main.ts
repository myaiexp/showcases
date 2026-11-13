// registerIconPacks with an inline Iconify JSON object (no fetch), then icons used in an architecture diagram and a TreeView
import type { Mount } from '@/types.ts';
import type { IconLoader } from 'mermaid';
import { playground } from '../../shared/playground.ts';
import { mermaid } from '../../shared/setup.ts';

// A pack is { name, icons } where icons is Iconify JSON: a prefix, a default size and each
// icon's SVG body. Because the object is passed directly (the SyncIconLoader shape) nothing
// is fetched. The name `showcasepack` is what diagrams write before the colon.
const PACK: IconLoader = {
  name: 'showcasepack',
  icons: {
    prefix: 'showcasepack',
    width: 24,
    height: 24,
    icons: {
      // A shop front: awning plus a door.
      shop: { body: '<path fill="#f59e0b" d="M3 4h18l2 6H1z"/><path fill="#e5e7eb" d="M3 11h18v10H3z"/><path fill="#475569" d="M10 14h4v7h-4z"/>' },
      // A stack of three bars.
      queue: { body: '<path fill="#38bdf8" d="M3 4h18v4H3zM3 10h18v4H3zM3 16h18v4H3z"/>' },
      // A lightning bolt.
      bolt: { body: '<path fill="#facc15" d="M13 2 4 14h6l-1 8 9-12h-6z"/>' },
      // A bucket.
      bucket: { body: '<path fill="#34d399" d="M4 6h16l-2 15H6z"/><ellipse cx="12" cy="6" rx="8" ry="2.5" fill="#a7f3d0"/>' },
      // A person.
      user: { body: '<circle cx="12" cy="7" r="4" fill="#c4b5fd"/><path fill="#8b5cf6" d="M4 21c0-5 3.5-8 8-8s8 3 8 8z"/>' },
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

// Architecture diagram: "name:icon-name" in the parentheses, where name is the registered name.
const ARCH = `architecture-beta
    group store(showcasepack:shop)[Storefront]

    service app(showcasepack:bolt)[Checkout] in store
    service jobs(showcasepack:queue)[Order queue] in store
    service files(showcasepack:bucket)[Receipts] in store
    service buyer(showcasepack:user)[Customer]

    buyer:R --> L:app
    app:R --> L:jobs
    jobs:B --> T:files`;

// TreeView: icon(pack:name) sets one node's icon, and explicit icons render even with showIcons off.
const TREE = `treeView-beta
    shop-app/
        src/
            checkout.ts icon(showcasepack:bolt) ## runs the payment
            queue.ts icon(showcasepack:queue) ## order jobs
            receipts.ts icon(showcasepack:bucket) ## stored in a bucket
        package.json
        README.md`;

const mount: Mount = (el, ctx) => {
  ensurePack();
  return playground(el, ctx, {
    variants: [
      { label: 'Architecture', code: ARCH },
      { label: 'TreeView', code: TREE },
    ],
  });
};

export default mount;
