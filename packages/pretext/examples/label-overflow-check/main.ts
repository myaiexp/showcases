// Dev-time check: which translated button labels wrap at a given button width, found without a DOM
import '@fontsource-variable/inter';
import { layout, measureNaturalWidth, prepare } from '@chenglou/pretext';
import type { Mount } from '@/types.ts';
import { LABELS } from './data.ts';
import './style.css';

const FONT = '600 14px "Inter Variable", "Noto Sans CJK JP", sans-serif';
const LINE_HEIGHT = 20;
const PAD_X = 14;

const mount: Mount = async (el, { preview, signal }) => {
  const labels = preview ? LABELS.filter((_, i) => i === 0 || i === 1 || i === 6) : LABELS;
  await document.fonts.load(FONT, labels.map((l) => l.label).join(' '));
  if (signal.aborted) return () => {};

  const root = document.createElement('div');
  root.className = 'root';
  const readout = document.createElement('p');
  readout.className = 'readout';
  const list = document.createElement('div');
  list.className = 'list';

  const rows = labels.map(({ lang, label }) => {
    const prepared = prepare(label, FONT);
    const row = document.createElement('div');
    row.className = 'row';
    const name = document.createElement('span');
    name.className = 'lang';
    name.textContent = lang;
    const button = document.createElement('div');
    button.className = 'button';
    button.style.font = FONT;
    button.style.lineHeight = `${LINE_HEIGHT}px`;
    button.style.padding = `8px ${PAD_X}px`;
    button.textContent = label;
    const note = document.createElement('span');
    note.className = 'note';
    row.append(name, button, note);
    list.append(row);
    return { prepared, row, button, note };
  });

  const check = (buttonWidth: number): void => {
    // The label gets the button's width minus its horizontal padding.
    const contentWidth = buttonWidth - 2 * PAD_X;
    let bad = 0;
    for (const { prepared, row, button, note } of rows) {
      const { lineCount } = layout(prepared, contentWidth, LINE_HEIGHT);
      const wraps = lineCount > 1;
      if (wraps) bad++;
      row.classList.toggle('bad', wraps);
      button.style.width = `${buttonWidth}px`;
      // measureNaturalWidth(): the width the label needs on one line.
      const need = Math.ceil(measureNaturalWidth(prepared)) + 2 * PAD_X;
      note.textContent = wraps ? `${lineCount} lines · needs ${need}px` : `fits · needs ${need}px`;
    }
    readout.textContent = `button width ${buttonWidth}px → ${bad} of ${rows.length} labels wrap`;
  };

  if (preview) {
    root.classList.add('preview');
    root.append(readout, list);
    el.append(root);
    let raf = 0;
    const tick = (t: number): void => {
      check(Math.round(130 + 110 * (0.5 + 0.5 * Math.sin(t / 1300))));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }

  const slider = document.createElement('input');
  slider.type = 'range';
  slider.min = '80';
  slider.max = '320';
  slider.value = '180';
  const onInput = (): void => check(Number(slider.value));
  slider.addEventListener('input', onInput);
  root.append(slider, readout, list);
  el.append(root);
  onInput();
  return () => slider.removeEventListener('input', onInput);
};

export default mount;
