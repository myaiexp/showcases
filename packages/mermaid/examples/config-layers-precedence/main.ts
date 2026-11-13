// One flowchart under each config layer: site config, frontmatter, scoped keys, edge level
import type { Mount } from '@/types.ts';
import { playground, type Variant } from '../../shared/playground.ts';
import { renderInto } from '../../shared/setup.ts';
import './style.css';

const BODY = `flowchart LR
  Req[Request] e1@--> Auth{Signed in?}
  Auth e2@-->|yes| Page[Render page]
  Auth e3@-->|no| Login[Login form]`;

// Each layer adds to the one before it; the render config is the merge of all of them.
const LAYERS: readonly (Variant & { note: string })[] = [
  {
    label: 'Site config',
    note: 'No frontmatter: the render config is the default config plus what this site passed to initialize() (here, theme: dark).',
    code: BODY,
  },
  {
    label: 'Frontmatter',
    note: 'A frontmatter config block overrides the site config for this diagram only: the base theme with its themeVariables, and a title.',
    code: `---
title: Frontmatter wins over initialize()
config:
  theme: base
  themeVariables:
    primaryColor: "#1f6f5c"
    primaryTextColor: "#ffffff"
    lineColor: "#e8a308"
---
${BODY}`,
  },
  {
    label: 'Diagram-scoped key',
    note: 'Keys under the diagram type (flowchart:) only reach that diagram type: curve: stepBefore draws stepped edges. Shown with layout: dagre, where the curve shape is easy to see.',
    code: `---
config:
  theme: base
  themeVariables:
    primaryColor: "#1f6f5c"
    primaryTextColor: "#ffffff"
    lineColor: "#e8a308"
  layout: dagre
  flowchart:
    curve: stepBefore
---
${BODY}`,
  },
  {
    label: 'Edge level',
    note: 'An edge-level curve overrides the diagram-level one: e3 is linear while the rest keep stepBefore.',
    code: `---
config:
  theme: base
  themeVariables:
    primaryColor: "#1f6f5c"
    primaryTextColor: "#ffffff"
    lineColor: "#e8a308"
  layout: dagre
  flowchart:
    curve: stepBefore
---
${BODY}
  e3@{ curve: linear }`,
  },
];

const mount: Mount = (el, ctx) => {
  if (ctx.preview) return playground(el, ctx, { variants: LAYERS, interval: 3000 });

  // Full view: every layer at once, rendered one after another into its own panel.
  const grid = document.createElement('div');
  grid.className = 'layers';
  el.append(grid);
  const panels = LAYERS.map((layer, i) => {
    const panel = document.createElement('figure');
    const caption = document.createElement('figcaption');
    const name = document.createElement('strong');
    name.textContent = `${i + 1}. ${layer.label}`;
    caption.append(name, ` ${layer.note}`);
    const box = document.createElement('div');
    box.className = 'mm-diagram';
    panel.append(box, caption);
    grid.append(panel);
    return box;
  });

  void (async () => {
    for (const [i, layer] of LAYERS.entries()) {
      if (ctx.signal.aborted) return;
      const box = panels[i]!;
      try {
        await renderInto(box, layer.code, ctx.signal);
      } catch (err) {
        box.textContent = err instanceof Error ? err.message : String(err);
      }
    }
  })();

  return () => undefined;
};

export default mount;
