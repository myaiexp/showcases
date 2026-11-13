// Wraps text into a terminal grid using a worker whose OffscreenCanvas measures one cell per grapheme
import type { Mount } from '@/types.ts';
import type { Reply, Request } from './worker.ts';
import './style.css';

const SAMPLE =
  'Pretext does not need a browser to wrap this paragraph: the worker told it every grapheme is one cell wide, so lines break by Chrome\'s rules over those widths. Café, naïve, 👩‍👩‍👧 and 🇫🇮 each count as one cell.';

const mount: Mount = (el, { preview }) => {
  const root = document.createElement('div');
  root.className = 'root';
  const term = document.createElement('pre');
  term.className = 'term';
  const readout = document.createElement('p');
  readout.className = 'readout';
  // This thread's canvas is untouched: only the worker's global scope was patched.
  const nativeOk = String(OffscreenCanvas).includes('[native code]');

  const worker = new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' });
  let id = 0;
  let cols = 36;
  let text = preview ? SAMPLE.slice(0, 70) : SAMPLE;
  const ask = (): void => worker.postMessage({ id: ++id, text, cols } satisfies Request);

  worker.onmessage = (e: MessageEvent<Reply>): void => {
    const { lines, measureCalls, lastFont, id: replyId } = e.data;
    if (replyId === -1) {
      ask();
      return;
    }
    // Pad each row to the grid width so the frame shows the column limit.
    term.textContent = lines.map(l => l.padEnd(cols)).join('\n');
    readout.textContent = `${cols} columns → ${lines.length} rows · the worker's measureText ran ${measureCalls} times (last font string "${lastFont}") · main thread OffscreenCanvas is ${nativeOk ? 'still native' : 'changed'}`;
  };

  const cleanups: (() => void)[] = [() => worker.terminate()];
  if (preview) {
    root.append(term);
    term.style.fontSize = '11px';
    let raf = 0;
    let last = 0;
    const tick = (t: number): void => {
      const c = Math.round(18 + 6 * Math.sin(t / 900));
      if (c !== last) {
        last = c;
        cols = c;
        ask();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    cleanups.push(() => cancelAnimationFrame(raf));
  } else {
    const controls = document.createElement('div');
    controls.className = 'controls';
    const editor = document.createElement('textarea');
    editor.rows = 3;
    editor.value = SAMPLE;
    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = '8';
    slider.max = '80';
    slider.value = String(cols);
    controls.append(slider, editor);
    root.append(controls, readout, term);
    const onSlide = (): void => {
      cols = Number(slider.value);
      ask();
    };
    const onText = (): void => {
      text = editor.value;
      ask();
    };
    slider.addEventListener('input', onSlide);
    editor.addEventListener('input', onText);
    cleanups.push(
      () => slider.removeEventListener('input', onSlide),
      () => editor.removeEventListener('input', onText),
    );
  }
  el.append(root);
  return () => cleanups.forEach(c => c());
};

export default mount;
