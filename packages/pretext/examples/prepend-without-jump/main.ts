// Prepends older messages above the viewport and re-anchors scrollTop by their predicted heights
import '@fontsource-variable/inter';
import { layout, prepare } from '@chenglou/pretext';
import type { Mount } from '@/types.ts';
import { messageText, SAMPLE_TEXT } from './data.ts';
import './style.css';

const FONT = '14px "Inter Variable"';
const LINE_HEIGHT = 20;
// Row = 4px margin above and below around a bubble with 8px / 12px padding, inside 12px side padding.
const SIDE = 12 + 12;
const ROW_EXTRA_Y = 8 + 16;
const START_ID = 1000;
const INITIAL = 24;

const mount: Mount = async (el, { preview, signal }) => {
  await document.fonts.load(FONT, SAMPLE_TEXT);
  if (signal.aborted) return () => {};

  const root = document.createElement('div');
  root.className = 'root';
  const readout = document.createElement('p');
  readout.className = 'readout';
  const scroller = document.createElement('div');
  scroller.className = 'scroller';
  const column = document.createElement('div');
  scroller.append(column);
  root.append(readout, scroller);
  el.append(root);

  let oldest = START_ID;
  let compensate = true;

  const makeRow = (id: number): { row: HTMLElement; height: number } => {
    const text = messageText(id);
    const row = document.createElement('div');
    row.className = 'row';
    row.dataset.id = String(id);
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.style.font = FONT;
    bubble.style.lineHeight = `${LINE_HEIGHT}px`;
    bubble.textContent = text;
    row.append(bubble);
    // The height this row will have, known before it is in the page.
    const height = layout(prepare(text, FONT), scroller.clientWidth - 2 * SIDE, LINE_HEIGHT).height + ROW_EXTRA_Y;
    return { row, height };
  };

  const anchor = (): HTMLElement | null => {
    const top = scroller.getBoundingClientRect().top;
    for (const child of column.children) if (child.getBoundingClientRect().bottom > top + 4) return child as HTMLElement;
    return null;
  };

  const prependOlder = (count: number): void => {
    const before = anchor();
    const beforeY = before ? before.getBoundingClientRect().top - scroller.getBoundingClientRect().top : 0;
    const fragment = document.createDocumentFragment();
    let added = 0;
    for (let i = 0; i < count; i++) {
      const { row, height } = makeRow(--oldest);
      fragment.prepend(row);
      added += height;
    }
    column.prepend(fragment);
    // Re-anchor: push scrollTop down by exactly the predicted height of what went in above.
    if (compensate) scroller.scrollTop += added;
    if (before) {
      before.classList.add('anchor');
      for (const row of column.children) if (row !== before) row.classList.remove('anchor');
    }
    const afterY = before ? before.getBoundingClientRect().top - scroller.getBoundingClientRect().top : 0;
    readout.textContent =
      `+${count} messages · predicted ${added}px · anchor moved ${Math.round(afterY - beforeY)}px · ${column.children.length} rows`;
  };

  const reset = (): void => {
    column.replaceChildren();
    oldest = START_ID;
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < INITIAL; i++) fragment.prepend(makeRow(--oldest).row);
    column.append(fragment);
    scroller.scrollTop = preview ? 60 : scroller.scrollHeight;
    readout.textContent = `${INITIAL} messages · scroll up and load older ones`;
  };
  reset();

  if (preview) {
    root.classList.add('preview');
    scroller.scrollTop = 40;
    let timer = 0;
    const tick = (): void => {
      if (column.children.length > 80) {
        reset();
        scroller.scrollTop = 40;
      }
      prependOlder(2);
      timer = window.setTimeout(tick, 1400);
    };
    timer = window.setTimeout(tick, 900);
    return () => clearTimeout(timer);
  }

  const controls = document.createElement('div');
  controls.className = 'controls';
  const button = document.createElement('button');
  button.textContent = 'Load 5 older messages';
  const label = document.createElement('label');
  const box = document.createElement('input');
  box.type = 'checkbox';
  box.checked = true;
  label.append(box, ' re-anchor scrollTop');
  controls.append(button, label);
  root.prepend(controls);
  const onClick = (): void => prependOlder(5);
  const onBox = (): void => {
    compensate = box.checked;
  };
  button.addEventListener('click', onClick);
  box.addEventListener('change', onBox);
  return () => {
    button.removeEventListener('click', onClick);
    box.removeEventListener('change', onBox);
  };
};

export default mount;
