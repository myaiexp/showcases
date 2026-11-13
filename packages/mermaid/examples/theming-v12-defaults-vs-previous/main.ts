// v12 defaults vs the previous appearance: pick a diagram type, then flip between the two frontmatter settings
import type { Mount } from '@/types.ts';
import { diagramBox, statusLine } from '../../shared/playground.ts';
import { renderInto } from '../../shared/setup.ts';
import { KINDS } from './kinds.ts';
import type { Kind } from './kinds.ts';

// This gallery initialises the site with theme: dark, which outranks a diagram type's own default
// (theming.md priority list), so the "v12 defaults" side names the redux-color theme and neo look
// explicitly. The previous side is the docs' recipe: theme default, look classic, and layout dagre
// where the type was laid out by ELK.
const v12 = (k: Kind): string => `---
config:
  theme: redux-color
  look: neo
---
${k.body}`;
const previous = (k: Kind): string => `---
config:
  theme: default
  look: classic${k.dagre ? '\n  layout: dagre' : ''}
---
${k.body}`;

const mount: Mount = (el, { preview, signal }) => {
  const box = diagramBox(el, preview);
  let kind = KINDS[0]!;
  let old = false;
  let ticket = 0;
  let timer = 0;

  const draw = async (report?: (t: string, e?: boolean) => void): Promise<void> => {
    const mine = ++ticket;
    const staging = document.createElement('div');
    try {
      await renderInto(staging, old ? previous(kind) : v12(kind), signal, box);
      if (mine !== ticket || signal.aborted) return;
      box.replaceChildren(...staging.childNodes);
      report?.(`${kind.label}: ${old ? 'previous appearance (theme default, look classic' + (kind.dagre ? ', layout dagre)' : ')') : 'v12 defaults (redux-color, neo)'}`);
    } catch (err) {
      if (mine === ticket && !signal.aborted) report?.(err instanceof Error ? err.message : String(err), true);
    }
  };

  if (preview) {
    // Walk the diagram types, flipping the appearance on every step.
    let i = 0;
    const next = (): void => {
      kind = KINDS[Math.floor(i / 2) % KINDS.length]!;
      old = i % 2 === 1;
      i++;
      void draw();
    };
    next();
    timer = window.setInterval(next, 2200);
    return () => {
      ticket++;
      clearInterval(timer);
    };
  }

  const report = statusLine(el);
  const mk = (cls: string): HTMLDivElement => {
    const d = document.createElement('div');
    d.className = cls;
    return d;
  };
  const kinds = mk('mm-tabs');
  const looks = mk('mm-tabs');
  const kindButtons = KINDS.map((k) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'mm-tab';
    b.textContent = k.label;
    b.addEventListener('click', () => {
      kind = k;
      for (const o of kindButtons) o.classList.toggle('active', o === b);
      void draw(report);
    });
    kinds.append(b);
    return b;
  });
  const lookButtons = ['v12 defaults', 'previous appearance'].map((text, n) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'mm-tab';
    b.textContent = text;
    b.addEventListener('click', () => {
      old = n === 1;
      for (const o of lookButtons) o.classList.toggle('active', o === b);
      void draw(report);
    });
    looks.append(b);
    return b;
  });
  kindButtons[0]!.classList.add('active');
  lookButtons[0]!.classList.add('active');
  el.insertBefore(looks, box);
  el.insertBefore(kinds, looks);
  void draw(report);
  return () => {
    ticket++;
  };
};

export default mount;
