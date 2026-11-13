// Keeps one prepared handle per paragraph and re-prepares only the paragraphs an edit touched
import '@fontsource-variable/inter';
import { layout, prepare, type PreparedText } from '@chenglou/pretext';
import type { Mount } from '@/types.ts';
import { INITIAL_TEXT, PREVIEW_EDITS } from './data.ts';
import './style.css';

const FONT = '14px "Inter Variable"';
const LINE_HEIGHT = 20;
const OPTIONS = { whiteSpace: 'pre-wrap' } as const;

type Para = { text: string; prepared: PreparedText };

const mount: Mount = async (el, { preview, signal }) => {
  await document.fonts.load(FONT, INITIAL_TEXT + PREVIEW_EDITS.join(''));
  if (signal.aborted) return () => {};

  const root = document.createElement('div');
  root.className = 'root';
  const area = document.createElement('textarea');
  area.className = 'area';
  area.style.font = FONT;
  area.style.lineHeight = `${LINE_HEIGHT}px`;
  area.spellcheck = false;
  area.readOnly = preview;
  area.value = INITIAL_TEXT;
  const readout = document.createElement('p');
  readout.className = 'readout';
  const chips = document.createElement('div');
  chips.className = 'chips';
  const frame = document.createElement('div');
  frame.className = 'frame';
  frame.append(area);
  root.append(frame, readout, chips);
  el.append(root);

  // README: prepare each paragraph apart, keeping its \n, and re-prepare only the edited one.
  let paras: Para[] = [];
  let first = true;
  const update = (): void => {
    const parts = area.value.split(/(?<=\n)/);
    // Paragraphs equal to the old ones at the start and end of the list keep their handles.
    let head = 0;
    while (head < parts.length && head < paras.length && parts[head] === paras[head]!.text) head++;
    let tail = 0;
    while (
      tail < parts.length - head &&
      tail < paras.length - head &&
      parts[parts.length - 1 - tail] === paras[paras.length - 1 - tail]!.text
    )
      tail++;
    const next: Para[] = [];
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i]!;
      const oldIndex = i < head ? i : i >= parts.length - tail ? paras.length - (parts.length - i) : -1;
      next.push(oldIndex >= 0 ? paras[oldIndex]! : { text: part, prepared: prepare(part, FONT, OPTIONS) });
    }
    const redone = new Set(next.filter((p) => !paras.includes(p)));
    paras = next;
    if (first) redone.clear();

    // area.clientWidth is the content width: the textarea has no padding, border or scrollbar.
    const width = area.clientWidth;
    let lineCount = 0;
    let height = 0;
    chips.replaceChildren();
    paras.forEach((p, i) => {
      const r = layout(p.prepared, width, LINE_HEIGHT);
      lineCount += r.lineCount;
      height += r.height;
      const chip = document.createElement('span');
      chip.className = redone.has(p) ? 'chip redone' : 'chip';
      chip.textContent = `${i + 1}`;
      chip.style.height = `${Math.max(1, r.lineCount) * 6 + 10}px`;
      chips.append(chip);
    });
    const which = [...redone].map((p) => paras.indexOf(p) + 1).join(', ') || 'none';
    const done = first ? `all ${paras.length} (initial)` : `${redone.size} (#${which})`;
    first = false;
    readout.textContent =
      `${paras.length} paragraphs · re-prepared: ${done} · ` +
      `${lineCount} lines, ${height}px at ${width}px wide`;
  };

  if (preview) {
    root.classList.add('preview');
    let step = 0;
    const timer = setInterval(() => {
      const lines = area.value.split(/(?<=\n)/);
      const at = (step * 5) % lines.length;
      const line = lines[at]!.replace(/\n$/, '');
      lines[at] = `${line.length > 90 ? line.split(' ').slice(0, 5).join(' ') : line + PREVIEW_EDITS[step % PREVIEW_EDITS.length]}\n`;
      area.value = lines.join('');
      step++;
      update();
    }, 900);
    update();
    return () => clearInterval(timer);
  }

  area.addEventListener('input', update);
  update();
  return () => area.removeEventListener('input', update);
};

export default mount;
