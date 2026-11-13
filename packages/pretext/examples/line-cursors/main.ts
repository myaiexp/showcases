// Prints layoutWithLines() as a table: text with visible spaces, width, and start/end cursors, for four edge cases
import '@fontsource-variable/inter';
import { layout, layoutWithLines, prepareWithSegments, type LayoutCursor } from '@chenglou/pretext';
import type { Mount } from '@/types.ts';
import { CASES, visible, type Case } from './data.ts';
import './style.css';

const FONT = '14px "Inter Variable"';
const LINE_HEIGHT = 20;

const cur = (c: LayoutCursor): string => `${c.segmentIndex}:${c.graphemeIndex}`;

const mount: Mount = async (el, { preview, signal }) => {
  await document.fonts.load(FONT, CASES.map((c) => c.text).join(''));
  if (signal.aborted) return () => {};

  const title = document.createElement('p');
  title.className = 'title';
  const table = document.createElement('table');
  const note = document.createElement('p');
  note.className = 'note';

  const cell = (row: HTMLElement, text: string, cls = ''): void => {
    const td = document.createElement('td');
    td.textContent = text;
    td.className = cls;
    row.append(td);
  };

  const render = (c: Case, width: number, preWrap: boolean): void => {
    const prepared = prepareWithSegments(c.text, FONT, preWrap ? { whiteSpace: 'pre-wrap' } : undefined);
    const { lines, lineCount, height } = layoutWithLines(prepared, width, LINE_HEIGHT);
    const head = document.createElement('tr');
    for (const h of ['#', 'text', 'width', 'Σ segments', 'start', 'end']) {
      const th = document.createElement('th');
      th.textContent = h;
      head.append(th);
    }
    const rows = lines.slice(0, preview ? 5 : lines.length).map((line, i) => {
      const tr = document.createElement('tr');
      cell(tr, String(i));
      cell(tr, visible(line.text), 'text');
      cell(tr, line.width.toFixed(2));
      // Sum the segment widths from start to end: a trailing space is in this sum but not in line.width.
      const whole = line.start.graphemeIndex === 0 && line.end.graphemeIndex === 0;
      let sum = 0;
      for (let s = line.start.segmentIndex; s < line.end.segmentIndex; s++) sum += prepared.widths[s] ?? 0;
      cell(tr, whole ? sum.toFixed(2) : 'partial segment');
      cell(tr, cur(line.start));
      cell(tr, cur(line.end), line.end.graphemeIndex > 0 ? 'mid' : '');
      return tr;
    });
    table.replaceChildren(head, ...rows);
    title.textContent = c.name;
    // layout() agrees with the line list: same count, height = count x lineHeight.
    const cheap = layout(prepared, width, LINE_HEIGHT);
    note.textContent = `layout(): lineCount ${cheap.lineCount}, height ${cheap.height}px · layoutWithLines(): ${lineCount} lines, ${height}px${lineCount === 0 ? ' (an empty text has no lines)' : ''}`;
  };

  if (preview) {
    const box = document.createElement('div');
    box.style.cssText = 'width:100%;height:196px;overflow:hidden';
    box.append(title, table);
    el.append(box);
    let i = 0;
    const step = (): void => {
      const c = CASES[i++ % CASES.length]!;
      render(c, c.width, c.preWrap);
    };
    step();
    const timer = setInterval(step, 2600);
    return () => clearInterval(timer);
  }

  const select = document.createElement('select');
  CASES.forEach((c, i) => select.append(new Option(c.name, String(i))));
  const preWrap = document.createElement('input');
  preWrap.type = 'checkbox';
  const wrapLabel = document.createElement('label');
  wrapLabel.append(preWrap, " 'pre-wrap'");
  const slider = document.createElement('input');
  slider.type = 'range';
  slider.min = '40';
  slider.max = '400';
  const wLabel = document.createElement('label');
  wLabel.append('Width ', slider);
  const editor = document.createElement('textarea');
  editor.rows = 3;
  const controls = document.createElement('div');
  controls.className = 'controls';
  controls.append(select, wLabel, wrapLabel);
  el.append(controls, editor, title, note, table);

  const run = async (): Promise<void> => {
    const text = editor.value;
    await document.fonts.load(FONT, text);
    if (signal.aborted) return;
    render({ name: CASES[Number(select.value)]!.name, text, width: 0, preWrap: false }, Number(slider.value), preWrap.checked);
  };
  const onCase = (): void => {
    const c = CASES[Number(select.value)]!;
    editor.value = c.text;
    slider.value = String(c.width);
    preWrap.checked = c.preWrap;
    void run();
  };
  select.addEventListener('input', onCase);
  for (const x of [slider, preWrap, editor]) x.addEventListener('input', run);
  onCase();
  return () => {
    select.removeEventListener('input', onCase);
    for (const x of [slider, preWrap, editor]) x.removeEventListener('input', run);
  };
};

export default mount;
