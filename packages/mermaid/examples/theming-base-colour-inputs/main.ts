// theme: base with themeVariables from colour inputs; Mermaid derives the other colours. The card cycles palettes
import type { Mount } from '@/types.ts';
import { diagramBox, statusLine } from '../../shared/playground.ts';
import { renderInto } from '../../shared/setup.ts';
import './style.css';

interface Palette {
  primaryColor: string;
  primaryTextColor: string;
  lineColor: string;
  secondaryColor: string;
}

// Hex only: the theming engine recognises hex colours, not names.
const PALETTES: Palette[] = [
  { primaryColor: '#BB2528', primaryTextColor: '#ffffff', lineColor: '#F8B229', secondaryColor: '#006100' },
  { primaryColor: '#1d4ed8', primaryTextColor: '#ffffff', lineColor: '#38bdf8', secondaryColor: '#0f766e' },
  { primaryColor: '#f5d0fe', primaryTextColor: '#4a044e', lineColor: '#a21caf', secondaryColor: '#fde68a' },
  { primaryColor: '#14532d', primaryTextColor: '#dcfce7', lineColor: '#86efac', secondaryColor: '#854d0e' },
];

const DIAGRAM = `flowchart TD
    Plan[Plan the trip] --> Book(Book travel)
    Book --> Check{Visa needed?}
    Check -->|yes| Apply[/Apply/]
    Check -->|no| Pack[Pack]
    Apply --> Pack
    subgraph Prep
        Book
        Check
        Apply
    end`;

// Literal sample of the generated definition: base theme plus themeVariables in frontmatter.
export const SAMPLE = `---
config:
  theme: base
  themeVariables:
    primaryColor: '#BB2528'
    primaryTextColor: '#ffffff'
    lineColor: '#F8B229'
    secondaryColor: '#006100'
---
${DIAGRAM}`;

const build = (p: Palette): string =>
  `---\nconfig:\n  theme: base\n  themeVariables:\n${Object.entries(p)
    .map(([k, v]) => `    ${k}: '${v}'`)
    .join('\n')}\n---\n${DIAGRAM}`;

const NAMES: Record<keyof Palette, string> = {
  primaryColor: 'primaryColor',
  primaryTextColor: 'primaryTextColor',
  lineColor: 'lineColor',
  secondaryColor: 'secondaryColor',
};

const mount: Mount = (el, { preview, signal }) => {
  const box = diagramBox(el, preview);
  const report = preview ? () => undefined : statusLine(el);
  const palette: Palette = { ...PALETTES[0]! };
  let ticket = 0;
  let timer = 0;

  const draw = async (): Promise<void> => {
    const mine = ++ticket;
    const staging = document.createElement('div');
    try {
      await renderInto(staging, build(palette), signal, box);
      if (mine !== ticket || signal.aborted) return;
      box.replaceChildren(...staging.childNodes);
      report('Rendered with theme: base');
    } catch (err) {
      if (mine === ticket && !signal.aborted) report(err instanceof Error ? err.message : String(err), true);
    }
  };

  if (preview) {
    let i = 0;
    const next = (): void => {
      Object.assign(palette, PALETTES[i++ % PALETTES.length]);
      void draw();
      timer = window.setTimeout(next, 3000);
    };
    next();
    return () => {
      ticket++;
      clearTimeout(timer);
    };
  }

  const row = document.createElement('div');
  row.className = 'base-inputs';
  const inputs = (Object.keys(NAMES) as (keyof Palette)[]).map((key) => {
    const label = document.createElement('label');
    const input = document.createElement('input');
    input.type = 'color';
    input.value = palette[key];
    input.addEventListener('input', () => {
      palette[key] = input.value;
      clearTimeout(timer);
      timer = window.setTimeout(() => void draw(), 120);
    });
    label.append(input, ` ${NAMES[key]}`);
    row.append(label);
    return { key, input };
  });
  const presets = document.createElement('div');
  presets.className = 'base-inputs';
  PALETTES.forEach((p, n) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'mm-tab';
    b.textContent = `Palette ${n + 1}`;
    b.addEventListener('click', () => {
      Object.assign(palette, p);
      for (const { key, input } of inputs) input.value = palette[key];
      void draw();
    });
    presets.append(b);
  });
  el.insertBefore(presets, box);
  el.insertBefore(row, box);
  void draw();
  return () => {
    ticket++;
    clearTimeout(timer);
  };
};

export default mount;
