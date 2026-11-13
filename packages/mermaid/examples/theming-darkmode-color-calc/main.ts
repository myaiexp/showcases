// primaryColor and darkMode only: the derived colours are read back from the rendered SVG and shown as swatches
import type { Mount } from '@/types.ts';
import { diagramBox, statusLine } from '../../shared/playground.ts';
import { renderInto } from '../../shared/setup.ts';
import './style.css';

const DIAGRAM = `graph TD
  A[Primary node] --> B(Rounded node)
  B -->|label| C{Decision}
  subgraph group [Cluster]
    C --> D[Inside the cluster]
  end`;

const definition = (primary: string, dark: boolean): string => `---
config:
  theme: base
  themeVariables:
    darkMode: ${dark}
    primaryColor: "${primary}"
---
${DIAGRAM}`;

// Cards cycle these pairs: each row is a primaryColor and a darkMode value.
const PRESETS: [string, boolean][] = [
  ['#bb2528', false],
  ['#bb2528', true],
  ['#1d4ed8', false],
  ['#16a34a', true],
];

/** Reads what the engine actually painted: node fill, cluster fill, cluster border and link stroke. */
function derived(box: HTMLElement): [string, string][] {
  const pick = (selector: string, prop: 'fill' | 'stroke'): string => {
    const node = box.querySelector(selector);
    return node ? getComputedStyle(node)[prop] : '';
  };
  return [
    ['node fill (primaryColor)', pick('.node rect, .node path', 'fill')],
    ['node border (primaryBorderColor)', pick('.node rect, .node path', 'stroke')],
    ['cluster fill (tertiaryColor)', pick('.cluster rect', 'fill')],
    ['cluster border (tertiaryBorderColor)', pick('.cluster rect', 'stroke')],
    ['link (lineColor)', pick('.flowchart-link', 'stroke')],
  ];
}

const mount: Mount = (el, { preview, signal }) => {
  const wrap = document.createElement('div');
  wrap.className = preview ? 'dm-wrap dm-card' : 'dm-wrap';
  const box = diagramBox(wrap, preview);
  const swatches = document.createElement('div');
  swatches.className = 'dm-swatches';
  wrap.append(swatches);
  el.append(wrap);
  let primary = PRESETS[0]![0];
  let dark = false;
  let ticket = 0;
  let timer = 0;
  let report: (t: string, e?: boolean) => void = () => undefined;

  const draw = async (): Promise<void> => {
    const mine = ++ticket;
    const staging = document.createElement('div');
    try {
      await renderInto(staging, definition(primary, dark), signal, box);
      if (mine !== ticket || signal.aborted) return;
      box.replaceChildren(...staging.childNodes);
      swatches.replaceChildren(
        ...derived(box).map(([name, value]) => {
          const row = document.createElement('div');
          row.className = 'dm-row';
          const chip = document.createElement('span');
          chip.className = 'dm-chip';
          chip.style.background = value;
          row.append(chip, `${name} ${value}`);
          return row;
        }),
      );
      report(`primaryColor ${primary}, darkMode ${dark}. Only hex values are understood: a colour name such as red does not drive the derived colours.`);
    } catch (err) {
      if (mine === ticket && !signal.aborted) report(err instanceof Error ? err.message : String(err), true);
    }
  };

  if (preview) {
    let i = 0;
    const next = (): void => {
      [primary, dark] = PRESETS[i++ % PRESETS.length]!;
      void draw();
    };
    next();
    timer = window.setInterval(next, 2400);
    return () => {
      ticket++;
      clearInterval(timer);
    };
  }

  const row = document.createElement('div');
  row.className = 'mm-row';
  const text = document.createElement('input');
  text.type = 'text';
  text.value = primary;
  text.size = 9;
  text.setAttribute('aria-label', 'primaryColor');
  const pick = document.createElement('input');
  pick.type = 'color';
  pick.value = primary;
  pick.setAttribute('aria-label', 'primaryColor picker');
  const check = document.createElement('input');
  check.type = 'checkbox';
  check.setAttribute('aria-label', 'darkMode');
  const onText = (): void => {
    primary = text.value.trim();
    void draw();
  };
  const onPick = (): void => {
    text.value = primary = pick.value;
    void draw();
  };
  const onCheck = (): void => {
    dark = check.checked;
    void draw();
  };
  text.addEventListener('change', onText);
  pick.addEventListener('input', onPick);
  check.addEventListener('change', onCheck);
  const l1 = document.createElement('label');
  l1.append('primaryColor ', text, ' ', pick);
  const l2 = document.createElement('label');
  l2.append(check, ' darkMode');
  row.append(l1, l2);
  el.insertBefore(row, wrap);
  report = statusLine(el);
  void draw();
  return () => {
    ticket++;
    text.removeEventListener('change', onText);
    pick.removeEventListener('input', onPick);
    check.removeEventListener('change', onCheck);
  };
};

export default mount;
