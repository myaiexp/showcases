// Prepares twelve paragraphs once, then re-runs only layout() as the width changes, timing both
import '@fontsource-variable/inter';
import { layout, prepare, type PreparedText } from '@chenglou/pretext';
import type { Mount } from '@/types.ts';
import { PARAGRAPHS } from './data.ts';
import './style.css';

const FONT = '15px "Inter Variable"';
const LINE_HEIGHT = 22;

const mount: Mount = async (el, { preview, signal }) => {
  await document.fonts.load(FONT, PARAGRAPHS.join(' '));
  if (signal.aborted) return () => {};

  // One-time work, timed once: segment and measure every paragraph.
  const t0 = performance.now();
  const prepared: PreparedText[] = PARAGRAPHS.map((p) => prepare(p, FONT));
  const prepareMs = performance.now() - t0;

  const root = document.createElement('div');
  root.className = 'root';
  const readout = document.createElement('p');
  readout.className = 'readout';
  const stage = document.createElement('div');
  stage.className = 'stage';
  const boxes = PARAGRAPHS.map((text) => {
    const p = document.createElement('p');
    p.className = 'para';
    p.style.font = FONT;
    p.style.lineHeight = `${LINE_HEIGHT}px`;
    p.textContent = text;
    stage.append(p);
    return p;
  });

  const render = (width: number): void => {
    // The hot path: layout() only. One pass is far below timer resolution, so average a few hundred.
    const REPEATS = preview ? 20 : 200;
    let total = 0;
    const start = performance.now();
    for (let r = 0; r < REPEATS; r++) {
      total = 0;
      for (const p of prepared) total += layout(p, width, LINE_HEIGHT).height;
    }
    const layoutMs = (performance.now() - start) / REPEATS;
    prepared.forEach((p, i) => {
      const box = boxes[i]!;
      box.style.width = `${width}px`;
      box.style.height = `${layout(p, width, LINE_HEIGHT).height}px`;
    });
    const timing = `prepare ×12: ${prepareMs.toFixed(1)} ms once · layout ×12: ${(layoutMs * 1000).toFixed(0)} µs/pass`;
    readout.textContent = preview
      ? `prepare ${prepareMs.toFixed(0)} ms once · layout ${(layoutMs * 1000).toFixed(0)} µs/pass`
      : `width ${width}px · total ${total}px · ${timing}`;
  };

  if (preview) {
    root.classList.add('preview');
    root.append(readout, stage);
    el.append(root);
    let raf = 0;
    const tick = (t: number): void => {
      render(Math.round(110 + 110 * (0.5 + 0.5 * Math.sin(t / 1100))));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }

  const slider = document.createElement('input');
  slider.type = 'range';
  slider.min = '80';
  slider.max = '600';
  slider.value = '360';
  const onInput = (): void => render(Number(slider.value));
  slider.addEventListener('input', onInput);
  root.append(slider, readout, stage);
  el.append(root);
  onInput();
  return () => slider.removeEventListener('input', onInput);
};

export default mount;
