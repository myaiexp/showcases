// Balances a headline by binary-searching the narrowest width that keeps the same line count
import '@fontsource-variable/inter';
import { layoutWithLines, prepareWithSegments, walkLineRanges } from '@chenglou/pretext';
import type { Mount } from '@/types.ts';
import './style.css';

const FAMILY = '"Inter Variable"';
const HEADLINES = [
  'A new library measures text without ever touching the DOM',
  'Why the shortest line in your headline is quietly ruining the layout',
  'Local council approves long-delayed plan for the harbour bridge',
  'Shipping a faster layout engine in a single weekend',
];

const mount: Mount = async (el, { preview, signal }) => {
  // A smaller size in the 200px preview card.
  const SIZE = preview ? 18 : 28;
  const LINE_HEIGHT = SIZE + (preview ? 4 : 6);
  const FONT = `600 ${SIZE}px ${FAMILY}`;
  await document.fonts.load(FONT, HEADLINES.join(' '));
  if (signal.aborted) return () => {};

  const root = document.createElement('div');
  root.className = 'root';
  const readout = document.createElement('p');
  readout.className = 'readout';
  const columns = document.createElement('div');
  columns.className = 'columns';
  root.append(columns);

  const prepared = HEADLINES.map((h) => prepareWithSegments(h, FONT));

  const countLines = (p: (typeof prepared)[number], width: number): number =>
    walkLineRanges(p, width, () => {});

  // Narrowest whole-pixel width that still wraps to the same number of lines as maxWidth.
  const balancedWidth = (p: (typeof prepared)[number], maxWidth: number): number => {
    const target = countLines(p, maxWidth);
    let lo = 1;
    let hi = maxWidth;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (countLines(p, mid) <= target) hi = mid;
      else lo = mid + 1;
    }
    return lo;
  };

  const block = (label: string, p: (typeof prepared)[number], width: number, maxWidth: number): HTMLElement => {
    const wrap = document.createElement('div');
    wrap.className = 'block';
    const cap = document.createElement('div');
    cap.className = 'cap';
    cap.textContent = label;
    const box = document.createElement('div');
    box.className = 'box';
    box.style.width = `${maxWidth}px`;
    const text = document.createElement('div');
    text.className = 'text';
    text.style.font = FONT;
    text.style.lineHeight = `${LINE_HEIGHT}px`;
    text.style.width = `${width}px`;
    // Lines come from layoutWithLines(); each one is painted alone with white-space: pre.
    const { lines } = layoutWithLines(p, width, LINE_HEIGHT);
    for (const line of lines) {
      const row = document.createElement('div');
      row.className = 'line';
      row.textContent = line.text;
      text.append(row);
    }
    box.append(text);
    wrap.append(cap, box);
    return wrap;
  };

  const render = (index: number, maxWidth: number): void => {
    const p = prepared[index];
    if (!p) return;
    const narrow = balancedWidth(p, maxWidth);
    columns.replaceChildren(
      block(`greedy at ${maxWidth}px`, p, maxWidth, maxWidth),
      block(`balanced at ${narrow}px`, p, narrow, maxWidth),
    );
    readout.textContent = `maxWidth ${maxWidth}px gives ${countLines(p, maxWidth)} lines; ${narrow}px is the narrowest width that still gives ${countLines(p, narrow)}`;
  };

  if (preview) {
    el.append(root);
    let step = 0;
    const show = (): void => {
      render(step % HEADLINES.length, 250);
      step++;
    };
    show();
    const id = window.setInterval(show, 2400);
    return () => window.clearInterval(id);
  }

  const select = document.createElement('select');
  HEADLINES.forEach((h, i) => select.append(new Option(h, String(i))));
  const slider = document.createElement('input');
  slider.type = 'range';
  slider.min = '200';
  slider.max = '640';
  slider.value = '420';
  root.prepend(select, slider, readout);
  el.append(root);
  const onInput = (): void => render(Number(select.value), Number(slider.value));
  select.addEventListener('input', onInput);
  slider.addEventListener('input', onInput);
  onInput();
  return () => {
    select.removeEventListener('input', onInput);
    slider.removeEventListener('input', onInput);
  };
};

export default mount;
