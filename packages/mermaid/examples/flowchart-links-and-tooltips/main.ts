// click with a URL, a tooltip and a link target, plus callback tooltips; securityLevel loose raised and restored
import type { Mount } from '@/types.ts';
import { playground, statusLine } from '../../shared/playground.ts';
import { BASE_CONFIG, mermaid } from '../../shared/setup.ts';

// Tooltip text goes in a second pair of double quotes after the URL. The two spellings
// `click B "url"` and `click D href "url"` are the same thing. Every URL here carries
// _blank so a click opens a new tab instead of leaving the gallery.
const TOOLTIPS = `flowchart LR
    A[Docs home] --> B[Flowchart page]
    B --> C[Gantt page]
    C --> D[Class page]
    click A "https://mermaid.js.org/intro/" "Opens the introduction" _blank
    click B href "https://mermaid.js.org/syntax/flowchart.html" "The flowchart syntax page" _blank
    click C "https://mermaid.js.org/syntax/gantt.html" "The Gantt syntax page" _blank
    click D href "https://mermaid.js.org/syntax/classDiagram.html" "The class diagram page" _blank`;

// The target comes after the optional tooltip. Without one a link opens in the same tab;
// _self, _blank, _parent and _top are supported.
const TARGETS = `flowchart LR
    A[No tooltip, new tab] --> B[Tooltip, new tab]
    B --> C[href form, new tab]
    C --> D[href form with tooltip]
    click A "https://mermaid.js.org" _blank
    click B "https://mermaid.js.org" "Open this in a new tab" _blank
    click C href "https://mermaid.js.org" _blank
    click D href "https://mermaid.js.org" "Open this in a new tab" _blank`;

// Callbacks take a tooltip as well. `click A showcaseCallback "tip"` passes the node id to the
// function; `click C call showcaseCallback()` calls it with no arguments. Both look the function
// up on window; this page defines showcaseCallback and prints what arrived.
const CALLBACKS = `flowchart LR
    A[Named callback] --> B[Link and tooltip]
    B --> C[call form]
    C --> D[call form, tooltip]
    click A showcaseCallback "Tooltip for a callback"
    click B "https://mermaid.js.org" "This is a tooltip for a link" _blank
    click C call showcaseCallback()
    click D call showcaseCallback() "Tooltip for a callback"`;

const VARIANTS = [
  { label: 'Link with tooltip', code: TOOLTIPS },
  { label: 'Link targets', code: TARGETS },
  { label: 'Callback tooltips', code: CALLBACKS },
];

// A card has no pointer, so it gets the same diagrams minus the click lines.
const stripClicks = (code: string): string =>
  code.split('\n').filter((l) => !l.trim().startsWith('click')).join('\n');

type Win = Window & { showcaseCallback?: (id?: string) => void };

const mount: Mount = (el, ctx) => {
  if (ctx.preview) {
    return playground(el, ctx, { variants: VARIANTS.map((v) => ({ ...v, code: stripClicks(v.code) })) });
  }
  // click lines are inert at the default 'strict' level (flowchart.md § Interaction).
  mermaid.initialize({ ...BASE_CONFIG, securityLevel: 'loose' });
  const win = window as Win;
  const stop = playground(el, ctx, { variants: VARIANTS });
  const readout = statusLine(el);
  readout('Hover a node for its tooltip; click one to follow the link or call back.');
  win.showcaseCallback = (id?: string): void => {
    readout(id ? `Callback called with node id "${id}".` : 'Callback called with no arguments.');
  };
  return () => {
    stop();
    delete win.showcaseCallback;
    mermaid.initialize(BASE_CONFIG);
  };
};

export default mount;
