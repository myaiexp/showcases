// One flowchart laid out with each layout that ships in a normal build: pick one in frontmatter, the card cycles them
import type { Mount } from '@/types.ts';
import { diagramBox, statusLine } from '../../shared/playground.ts';
import { renderInto } from '../../shared/setup.ts';
import './style.css';

// elk is the v12 default and bundled; the named ELK algorithms and cose-bilkent are listed
// in layouts.md. (tidy-tree is a separate package, only for mindmaps, so it is left out.)
const LAYOUTS = ['elk', 'dagre', 'elk.stress', 'elk.force', 'elk.mrtree', 'cose-bilkent'];

const DIAGRAM = `flowchart TD
    Start([Request]) --> Auth{Signed in?}
    Auth -->|no| Login[Log in]
    Login --> Auth
    Auth -->|yes| Load[Load account]
    Load --> Cache[(Cache)]
    Load --> Db[(Database)]
    Cache --> Render[Render page]
    Db --> Render
    Render --> Done([Response])`;

// Literal sample of what the select builds: the layout key goes in frontmatter config.
export const SAMPLE = `---
config:
  layout: dagre
---
${DIAGRAM}`;

const withLayout = (layout: string): string => `---\nconfig:\n  layout: ${layout}\n---\n${DIAGRAM}`;

const mount: Mount = (el, { preview, signal }) => {
  const box = diagramBox(el, preview);
  const report = preview ? () => undefined : statusLine(el);
  let ticket = 0;
  let timer = 0;
  let label: HTMLElement | null = null;

  const draw = async (layout: string): Promise<void> => {
    const mine = ++ticket;
    const staging = document.createElement('div');
    try {
      await renderInto(staging, withLayout(layout), signal, box);
      if (mine !== ticket || signal.aborted) return;
      box.replaceChildren(...staging.childNodes);
      if (label) label.textContent = `layout: ${layout}`;
      report(`Rendered with layout: ${layout}`);
    } catch (err) {
      if (mine === ticket && !signal.aborted) report(err instanceof Error ? err.message : String(err), true);
    }
  };

  if (preview) {
    // Card: cycle the layouts, showing which one is up.
    label = document.createElement('p');
    label.className = 'layout-tag';
    el.append(label);
    let i = 0;
    const next = (): void => {
      void draw(LAYOUTS[i++ % LAYOUTS.length]!);
      timer = window.setTimeout(next, 3000);
    };
    next();
    return () => {
      ticket++;
      clearTimeout(timer);
    };
  }

  const row = document.createElement('div');
  row.className = 'mm-row';
  const select = document.createElement('select');
  select.setAttribute('aria-label', 'Layout');
  for (const l of LAYOUTS) select.add(new Option(l, l));
  const onChange = (): void => void draw(select.value);
  select.addEventListener('change', onChange);
  row.append('layout: ', select);
  el.insertBefore(row, box);
  void draw(select.value);
  return () => {
    ticket++;
    select.removeEventListener('change', onChange);
  };
};

export default mount;
