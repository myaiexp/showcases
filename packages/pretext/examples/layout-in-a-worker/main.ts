// Spawns a module worker that prepares and lays out a batch of messages; this thread only paints
import '@fontsource-variable/inter';
import interUrl from '@fontsource-variable/inter/files/inter-latin-wght-normal.woff2?url';
import type { Mount } from '@/types.ts';
import { MESSAGES } from './data.ts';
import type { FromWorker, ToWorker } from './data.ts';
import './style.css';

const mount: Mount = async (el, { preview, signal }) => {
  await document.fonts.load('16px "Inter Variable"', MESSAGES.join(''));
  if (signal.aborted) return () => {};
  const root = document.createElement('div');
  root.className = 'root';
  const readout = document.createElement('p');
  readout.className = 'readout';
  readout.textContent = 'Starting the worker...';
  const list = document.createElement('div');
  list.className = 'list';
  const items = MESSAGES.slice(0, preview ? 4 : MESSAGES.length).map(text => {
    const p = document.createElement('p');
    p.className = 'msg';
    p.textContent = text;
    const bar = document.createElement('i');
    bar.className = 'bar';
    p.prepend(bar);
    list.append(p);
    return { p, bar };
  });

  const worker = new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' });
  let ready = false;
  let nextId = 0;
  let width = 280;
  let fontNote = '';

  const request = (w: number): void => {
    width = w;
    if (ready) worker.postMessage({ type: 'layout', id: nextId++, width: w } satisfies ToWorker);
  };

  worker.onmessage = (e: MessageEvent<FromWorker>): void => {
    const msg = e.data;
    if (msg.type === 'error') {
      readout.textContent = `Worker failed: ${msg.message}`;
    } else if (msg.type === 'ready') {
      ready = true;
      fontNote = `lang "${msg.lang}" · ${msg.fontSource}`;
      request(width);
    } else {
      let agree = 0;
      items.forEach(({ p, bar }, i) => {
        const h = msg.heights[i] ?? 0;
        p.style.width = `${width}px`;
        bar.style.height = `${h}px`;
        // Reading the DOM here only proves the worker's numbers; the worker never needed it.
        const ok = p.getBoundingClientRect().height === h;
        bar.classList.toggle('off', !ok);
        if (ok) agree++;
      });
      readout.textContent = `${width}px: worker laid out ${items.length} messages in ${msg.micros}µs · DOM agrees on ${agree}/${items.length} · ${fontNote}`;
    }
  };
  worker.onerror = (e): void => {
    readout.textContent = `Worker error: ${e.message}`;
  };

  // The worker has no <html lang>, so the page sends its own.
  worker.postMessage({
    type: 'init',
    lang: document.documentElement.lang,
    fontUrl: interUrl,
    texts: items.map((_, i) => MESSAGES[i] ?? ''),
  } satisfies ToWorker);

  let raf = 0;
  const cleanups: (() => void)[] = [() => worker.terminate()];
  if (preview) {
    root.append(list);
    let last = 0;
    const tick = (t: number): void => {
      const w = 4 * Math.round((170 + 60 * Math.sin(t / 1000)) / 4);
      if (w !== last) {
        last = w;
        request(w);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    cleanups.push(() => cancelAnimationFrame(raf));
  } else {
    const controls = document.createElement('div');
    controls.className = 'controls';
    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = '80';
    slider.max = '520';
    slider.value = String(width);
    const label = document.createElement('span');
    label.textContent = 'width';
    controls.append(label, slider);
    root.append(controls, readout, list);
    const onInput = (): void => request(Number(slider.value));
    slider.addEventListener('input', onInput);
    cleanups.push(() => slider.removeEventListener('input', onInput));
  }
  el.append(root);
  return () => cleanups.forEach(c => c());
};

export default mount;
