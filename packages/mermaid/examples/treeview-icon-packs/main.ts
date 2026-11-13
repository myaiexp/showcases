// TreeView with a small inline icon pack: file-type maps, defaultIconPack, icon() overrides and theme colours
import type { Mount } from '@/types.ts';
import type { IconLoader } from 'mermaid';
import { playground } from '../../shared/playground.ts';
import { mermaid } from '../../shared/setup.ts';

// Inline Iconify JSON, so nothing is fetched. Most bodies use currentColor, which the
// treeView iconColor theme variable tints; "docker" keeps its own blue.
const PACK: IconLoader = {
  name: 'filetypes',
  icons: {
    prefix: 'filetypes',
    width: 24,
    height: 24,
    icons: {
      typescript: { body: '<rect x="3" y="3" width="18" height="18" rx="3" fill="#3b82f6"/><path fill="#fff" d="M7 9h7v2h-2.5v7h-2v-7H7zM15 12h4v2h-2v1h2v3h-4v-2h2v-1h-2z"/>' },
      react: { body: '<circle cx="12" cy="12" r="2" fill="currentColor"/><g fill="none" stroke="currentColor" stroke-width="1.4"><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/></g>' },
      docker: { body: '<path fill="#2496ed" d="M2 12h20c0 5-4 8-9 8s-9-3-11-8zM4 8h3v3H4zM8 8h3v3H8zM12 8h3v3h-3zM8 4h3v3H8z"/>' },
      markdown: { body: '<path fill="none" stroke="currentColor" stroke-width="2" d="M3 6h18v12H3zM6 15V9l3 3 3-3v6M16 9v6m-2-2 2 2 2-2"/>' },
      rust: { body: '<circle cx="12" cy="12" r="8" fill="none" stroke="#f97316" stroke-width="3" stroke-dasharray="3 2"/><circle cx="12" cy="12" r="3" fill="#f97316"/>' },
      package: { body: '<path fill="currentColor" d="M12 2 3 7v10l9 5 9-5V7zm0 2.2 6 3.3-6 3.3-6-3.3z"/>' },
    },
  },
};

// The treeView labelColor and lineColor default to black, so each variant lifts them for this dark page.
// Registration is page-wide and permanent, so it happens once however often this mounts.
let registered = false;
function ensurePack(): void {
  if (registered) return;
  registered = true;
  mermaid.registerIconPacks([PACK]);
}

const FILES = `    src/
        App.tsx
        utils.ts
        main.rs
    Dockerfile
    notes.txt
    README.md`;

// filenameIcons matches whole names, extensionIcons matches the suffix; "none" hides the icon.
// Folders and unmapped files (README.md) keep the built-in folder and file icons.
const MAPS = `---
config:
  treeView:
    showIcons: true
    defaultIconPack: filetypes
    filenameIcons:
      Dockerfile: docker
    extensionIcons:
      .ts: typescript
      .tsx: react
      .rs: rust
      .txt: none
  themeVariables:
    treeView:
      labelColor: '#e5e7eb'
      lineColor: '#64748b'
---
treeView-beta
${FILES}`;

// icon(name) sets one node's icon; with defaultIconPack it is shorthand for icon(filetypes:name).
// Explicit icons render even with showIcons off, so the rest of the tree stays bare.
const OVERRIDES = `---
config:
  treeView:
    defaultIconPack: filetypes
  themeVariables:
    treeView:
      labelColor: '#e5e7eb'
      lineColor: '#64748b'
---
treeView-beta
    src/
        App.tsx icon(react)
        utils.ts icon(filetypes:typescript)
        main.rs
    package.json icon(package)
    README.md icon(markdown)`;

// With showIcons on, icon(none) hides the icon of one node while the others keep theirs.
const HIDING = `---
config:
  treeView:
    showIcons: true
    defaultIconPack: filetypes
    extensionIcons:
      .md: markdown
  themeVariables:
    treeView:
      labelColor: '#e5e7eb'
      lineColor: '#64748b'
---
treeView-beta
    docs/
        guide.md
        draft.md icon(none)
    src/
        index.js icon(none)
    README.md`;

// iconColor tints every icon that draws with currentColor; the coloured ones are unchanged.
const THEME = `---
config:
  treeView:
    showIcons: true
    defaultIconPack: filetypes
    extensionIcons:
      .tsx: react
      .md: markdown
      .json: package
  themeVariables:
    treeView:
      iconColor: '#f472b6'
      labelColor: '#f5f5f5'
      lineColor: '#64748b'
---
treeView-beta
    app/
        App.tsx
        notes.md
        package.json`;

const mount: Mount = (el, ctx) => {
  ensurePack();
  return playground(el, ctx, {
    variants: [
      { label: 'Filename and extension maps', code: MAPS },
      { label: 'icon() overrides', code: OVERRIDES },
      { label: 'Hiding icons', code: HIDING },
      { label: 'Icon colour', code: THEME },
    ],
  });
};

export default mount;
