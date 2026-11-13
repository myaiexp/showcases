// Rich text flowing around a float, one line at a time with a width per line
import '@fontsource-variable/inter';
import { layoutNextRichInlineLineRange, materializeRichInlineLineRange, prepareRichInline } from '@chenglou/pretext/rich-inline';
import type { RichInlineCursor } from '@chenglou/pretext/rich-inline';
import type { Mount } from '@/types.ts';
import { paintLine, toItem } from './paint.ts';
import { BODY, FONTS, LINE_HEIGHT, PIECES } from './data.ts';
import './style.css';

const GAP = 12;
type Side = 'left' | 'right';

const mount: Mount = async (el, { preview, signal }) => {
  await Promise.all(FONTS.map((f) => document.fonts.load(f, 'Aa@')));
  if (signal.aborted) return () => {};

  const pieces = preview ? PIECES.slice(0, 4) : PIECES; // the card shows the first sentence
  const prepared = prepareRichInline(pieces.map(toItem));

  const root = document.createElement('div');
  root.className = 'root';
  const stage = document.createElement('div');
  stage.className = 'stage';
  stage.style.font = BODY;
  stage.style.lineHeight = `${LINE_HEIGHT}px`;
  const floatEl = document.createElement('div');
  floatEl.className = 'float';
  const readout = document.createElement('p');
  readout.className = 'readout';

  const render = (width: number, floatW: number, floatH: number, side: Side): void => {
    const rows: HTMLElement[] = [];
    let cursor: RichInlineCursor | undefined;
    let y = 0;
    for (;;) {
      // Lines that start above the float's bottom edge are narrower and, on the left, shifted right.
      const beside = y < floatH;
      const available = Math.max(40, beside ? width - floatW - GAP : width);
      const range = layoutNextRichInlineLineRange(prepared, available, cursor);
      if (range === null) break;
      const row = paintLine(materializeRichInlineLineRange(prepared, range), pieces, LINE_HEIGHT);
      row.style.position = 'absolute';
      row.style.top = `${y}px`;
      row.style.left = `${beside && side === 'left' ? floatW + GAP : 0}px`;
      rows.push(row);
      y += LINE_HEIGHT;
      cursor = range.end; // the next line starts where this one ended
    }
    stage.style.width = `${width}px`;
    stage.style.height = `${Math.max(y, floatH)}px`;
    Object.assign(floatEl.style, { width: `${floatW}px`, height: `${floatH}px`, [side]: '0', [side === 'left' ? 'right' : 'left']: 'auto' });
    stage.replaceChildren(floatEl, ...rows);
    readout.textContent = `${rows.length} lines in ${width}px; ${Math.min(rows.length, Math.ceil(floatH / LINE_HEIGHT))} beside the ${floatW}x${floatH} float`;
  };

  if (preview) {
    root.append(stage);
    el.append(root);
    let raf = 0;
    const tick = (t: number): void => {
      render(240, 70, Math.round(50 + 50 * (0.5 + 0.5 * Math.sin(t / 1100))), 'right');
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }

  const mk = (label: string, min: number, max: number, value: number): [HTMLLabelElement, HTMLInputElement] => {
    const wrap = document.createElement('label');
    const input = document.createElement('input');
    input.type = 'range';
    Object.assign(input, { min: String(min), max: String(max), value: String(value) });
    wrap.append(label, input);
    return [wrap, input];
  };
  const [wLabel, wInput] = mk('column width', 200, 600, 400);
  const [fwLabel, fwInput] = mk('float width', 40, 200, 110);
  const [fhLabel, fhInput] = mk('float height', 20, 220, 110);
  const select = document.createElement('select');
  select.append(new Option('float left', 'left'), new Option('float right', 'right'));
  const controls = document.createElement('div');
  controls.className = 'controls';
  controls.append(wLabel, fwLabel, fhLabel, select);
  root.append(controls, readout, stage);
  el.append(root);

  const onInput = (): void => render(Number(wInput.value), Number(fwInput.value), Number(fhInput.value), select.value === 'left' ? 'left' : 'right');
  controls.addEventListener('input', onInput);
  onInput();
  return () => controls.removeEventListener('input', onInput);
};

export default mount;
