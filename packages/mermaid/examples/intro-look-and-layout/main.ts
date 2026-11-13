// Pick a look (classic / neo / handDrawn) and a layout (dagre / elk) and watch one flowchart redraw
import type { Mount } from '@/types.ts';
import { diagramBox, statusLine } from '../../shared/playground.ts';
import { renderInto } from '../../shared/setup.ts';

const LOOKS = ['classic', 'neo', 'handDrawn'] as const;
const LAYOUTS = ['dagre', 'elk'] as const;

// The diagram from syntax-reference § Layout and look, with look and layout in the frontmatter.
const SAMPLE = `---
config:
  look: handDrawn
  layout: elk
  theme: dark
---
flowchart LR
  A[Start] --> B{Decision}
  B -->|Yes| C[Continue]
  B -->|No| D[Stop]`;

// The same definition for any pair of options: swap the two frontmatter values.
const build = (look: string, layout: string): string =>
  SAMPLE.replace(/look: \w+/, `look: ${look}`).replace(/layout: \w+/, `layout: ${layout}`);

const mount: Mount = (el, { preview, signal }) => {
  const box = diagramBox(el, preview);
  const report = preview ? () => {} : statusLine(el);
  let look: string = LOOKS[0];
  let layout: string = LAYOUTS[0];
  let ticket = 0;
  let timer = 0;

  const draw = async (): Promise<void> => {
    const mine = ++ticket;
    const staging = document.createElement('div');
    try {
      await renderInto(staging, build(look, layout), signal);
      if (mine !== ticket || signal.aborted) return;
      box.replaceChildren(...staging.childNodes);
      report(`look: ${look}, layout: ${layout}`);
    } catch (err) {
      if (mine === ticket && !signal.aborted) report(err instanceof Error ? err.message : String(err), true);
    }
  };

  if (preview) {
    let i = 0;
    const next = (): void => {
      look = LOOKS[i % LOOKS.length]!;
      layout = LAYOUTS[Math.floor(i / LOOKS.length) % LAYOUTS.length]!;
      void draw();
      i++;
      timer = window.setTimeout(next, 2500);
    };
    next();
    return () => {
      ticket++;
      clearTimeout(timer);
    };
  }

  const bar = document.createElement('div');
  bar.className = 'mm-tabs';
  const select = (label: string, options: readonly string[], set: (v: string) => void): void => {
    const wrap = document.createElement('label');
    wrap.textContent = `${label} `;
    const s = document.createElement('select');
    for (const o of options) s.append(new Option(o, o));
    const onChange = (): void => {
      set(s.value);
      void draw();
    };
    s.addEventListener('change', onChange);
    cleanups.push(() => s.removeEventListener('change', onChange));
    wrap.append(s);
    bar.append(wrap);
  };
  const cleanups: Array<() => void> = [];
  select('look', LOOKS, (v) => (look = v));
  select('layout', LAYOUTS, (v) => (layout = v));
  el.insertBefore(bar, box);
  void draw();
  return () => {
    ticket++;
    for (const c of cleanups) c();
  };
};

export default mount;
