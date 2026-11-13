// accTitle and accDescr in a diagram, then a readout of the ARIA attributes, <title> and <desc> Mermaid put on the SVG
import type { Mount } from '@/types.ts';
import { diagramBox } from '../../shared/playground.ts';
import { renderInto } from '../../shared/setup.ts';
import './style.css';

interface Kind {
  label: string;
  /** Diagram body that follows the accessibility lines. */
  body: string;
  /** Keyword line that opens the diagram. */
  head: string;
}

// Each kind is a docs sample shape: the keyword, then accTitle/accDescr, then the diagram itself.
const KINDS: Record<string, Kind> = {
  flowchart: {
    label: 'Flowchart',
    head: 'graph LR',
    body: '  A[Identify Big Decision] --> B{Make Big Decision}\n  B --> D[Be done]',
  },
  pie: {
    label: 'Pie chart',
    head: 'pie',
    body: '  title Key elements in Product X\n  "Calcium" : 42.96\n  "Potassium" : 50.05\n  "Magnesium" : 10.01\n  "Iron" : 5',
  },
  sequence: {
    label: 'Sequence diagram',
    head: 'sequenceDiagram',
    body: '  Alice->>John: Hello John, how are you?\n  John-->>Alice: Great!\n  Alice-)John: See you later!',
  },
  state: { label: 'State diagram', head: 'stateDiagram', body: '  s1 --> s2' },
};

// A literal sample of what build() produces, with a multi-line accDescr block.
export const SAMPLE = `graph LR
  accTitle: Big Decisions
  accDescr {
    Bob's Burgers process for making big decisions.
    Identify the decision, then make it.
  }
  A[Identify Big Decision] --> B{Make Big Decision}
  B --> D[Be done]`;

/** One line of description uses accDescr: text; several lines use the accDescr { } block. */
function build(kind: string, title: string, desc: string): string {
  const k = KINDS[kind]!;
  const t = title.replace(/[\r\n]+/g, ' ').trim();
  const lines = desc.replace(/[{}]/g, '').split('\n').map((l) => l.trim()).filter(Boolean);
  const acc = [`  accTitle: ${t}`];
  if (lines.length === 1) acc.push(`  accDescr: ${lines[0]}`);
  else if (lines.length > 1) acc.push('  accDescr {', ...lines.map((l) => `    ${l}`), '  }');
  return `${k.head}\n${acc.join('\n')}\n${k.body}`;
}

const CYCLE: [string, string, string][] = [
  ['flowchart', 'Big Decisions', "Bob's Burgers process for making big decisions"],
  ['pie', 'Product X composition', 'Shares of calcium, potassium, magnesium and iron'],
  ['sequence', 'Greeting exchange', 'Alice greets John, John answers, Alice says goodbye'],
  ['state', 'Two states', 'A single transition from s1 to s2'],
];

const mount: Mount = (el, { preview, signal }) => {
  const box = diagramBox(el, preview);
  let ticket = 0;
  let timer = 0;
  let readout: HTMLElement | null = null;

  const draw = async (kind: string, title: string, desc: string): Promise<void> => {
    const mine = ++ticket;
    const staging = document.createElement('div');
    try {
      const { svg } = await renderInto(staging, build(kind, title, desc), signal, box);
      if (mine !== ticket || signal.aborted || !svg) return;
      box.replaceChildren(...staging.childNodes);
      if (!readout) return;
      const rows: [string, string][] = [
        ['aria-roledescription', svg.getAttribute('aria-roledescription') ?? '(none)'],
        ['aria-labelledby', svg.getAttribute('aria-labelledby') ?? '(none)'],
        ['aria-describedby', svg.getAttribute('aria-describedby') ?? '(none)'],
        ['<title>', svg.querySelector(':scope > title')?.textContent ?? '(none)'],
        ['<desc>', (svg.querySelector(':scope > desc')?.textContent ?? '(none)').replace(/\s+/g, ' ').trim()],
      ];
      readout.replaceChildren(
        ...rows.flatMap(([k, v]) => {
          const dt = document.createElement('dt');
          dt.textContent = k;
          const dd = document.createElement('dd');
          dd.textContent = v;
          return [dt, dd];
        }),
      );
    } catch (err) {
      if (mine === ticket && !signal.aborted) box.textContent = err instanceof Error ? err.message : String(err);
    }
  };

  if (preview) {
    let i = 0;
    const next = (): void => {
      const [k, t, d] = CYCLE[i++ % CYCLE.length]!;
      void draw(k, t, d);
      timer = window.setTimeout(next, 3000);
    };
    next();
    return () => {
      ticket++;
      clearTimeout(timer);
    };
  }

  const form = document.createElement('div');
  form.className = 'a11y-form';
  const field = <T extends HTMLElement>(text: string, input: T): T => {
    const label = document.createElement('label');
    label.textContent = text;
    label.append(input);
    form.append(label);
    return input;
  };
  const select = field('Diagram', document.createElement('select'));
  for (const [value, k] of Object.entries(KINDS)) select.add(new Option(k.label, value));
  const title = field('accTitle (one line)', document.createElement('input'));
  title.value = CYCLE[0]![1];
  const desc = field('accDescr (one line, or several for the { } block)', document.createElement('textarea'));
  desc.rows = 3;
  desc.value = CYCLE[0]![2];
  el.insertBefore(form, box);

  readout = document.createElement('dl');
  readout.className = 'a11y-readout';
  readout.setAttribute('aria-label', 'Attributes read from the rendered SVG');
  el.append(readout);

  const update = (): void => {
    clearTimeout(timer);
    timer = window.setTimeout(() => void draw(select.value, title.value, desc.value), 250);
  };
  select.addEventListener('change', update);
  title.addEventListener('input', update);
  desc.addEventListener('input', update);
  void draw(select.value, title.value, desc.value);

  return () => {
    ticket++;
    clearTimeout(timer);
    select.removeEventListener('change', update);
    title.removeEventListener('input', update);
    desc.removeEventListener('input', update);
  };
};

export default mount;
