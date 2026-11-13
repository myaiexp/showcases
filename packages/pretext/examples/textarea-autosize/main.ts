// Sizes a textarea to its content with prepare(pre-wrap) + layout(), no scrollHeight reads to drive it
import '@fontsource-variable/inter';
import { layout, prepare } from '@chenglou/pretext';
import type { Mount } from '@/types.ts';
import './style.css';

const FONT = '15px "Inter Variable"';
const LINE_HEIGHT = 22;
const DEMO =
  'Type here and the box grows.\nHard breaks and  repeated   spaces are kept.\n\nTrailing newline adds a line:\n';
const PREVIEW_TEXT =
  'The box is sized by Pretext as this text is typed.\nA second paragraph wraps onto a few more lines, and the box follows it without measuring anything in the page.\n';

const mount: Mount = async (el, { preview, signal }) => {
  await document.fonts.load(FONT, DEMO + PREVIEW_TEXT);
  if (signal.aborted) return () => {};

  const root = document.createElement('div');
  root.className = 'root';
  const frame = document.createElement('div');
  frame.className = 'frame';
  const area = document.createElement('textarea');
  area.className = 'area';
  area.style.font = FONT;
  area.style.lineHeight = `${LINE_HEIGHT}px`;
  area.spellcheck = false;
  area.readOnly = preview;
  frame.append(area);
  const readout = document.createElement('p');
  readout.className = 'readout';
  root.append(frame, readout);
  el.append(root);

  const resize = (): void => {
    const value = area.value;
    // The textarea has no padding or border, so its clientWidth is the content width.
    const width = area.clientWidth;
    const prepared = prepare(value, FONT, { whiteSpace: 'pre-wrap' });
    const { height, lineCount } = layout(prepared, width, LINE_HEIGHT);
    // README: a <textarea> shows one more line when its value is empty or ends with \n.
    const extra = value === '' || value.endsWith('\n') ? LINE_HEIGHT : 0;
    area.style.height = `${height + extra}px`;
    readout.textContent = `${lineCount} lines + ${extra / LINE_HEIGHT} → height ${height + extra}px`;
    if (!preview) readout.textContent += ` · scrollHeight ${area.scrollHeight}px`;
  };

  if (preview) {
    root.classList.add('preview');
    let n = 0;
    let hold = 0;
    const timer = setInterval(() => {
      if (hold > 0) {
        hold--;
        return;
      }
      n++;
      if (n > PREVIEW_TEXT.length) {
        n = 0;
        hold = 25;
      }
      area.value = PREVIEW_TEXT.slice(0, n);
      resize();
    }, 70);
    resize();
    return () => clearInterval(timer);
  }

  area.value = DEMO;
  const observer = new ResizeObserver(resize);
  observer.observe(frame);
  area.addEventListener('input', resize);
  resize();
  return () => {
    observer.disconnect();
    area.removeEventListener('input', resize);
  };
};

export default mount;
