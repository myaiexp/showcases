// A spinner drawn every frame shows whether a big parse freezes the page
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { button, slider } from '../../shared/controls.ts';
import { flow } from '../../shared/panes.ts';
import { createStage } from '../../shared/stage.ts';
import { bigOrdersCsv } from '../../shared/stream-kit.ts';
import { stats } from '../../shared/widgets.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The spinner and the dot are moved by script every frame. If they stop, the page is frozen.' });
  const f = flow(stage, { from: 'The page, drawn every frame', via: 'Papa.parse(csv, { worker: true })', to: 'The parse', split: 0.35 });
  const beat = document.createElement('div');
  beat.className = 'beat';
  beat.innerHTML = '<div class="ring"></div><div class="lane"><div class="dot"></div></div><span class="frames"></span>';
  f.from.body.append(beat);
  const ring = beat.querySelector<HTMLElement>('.ring')!;
  const dot = beat.querySelector<HTMLElement>('.dot')!;
  const frames = beat.querySelector<HTMLElement>('.frames')!;
  const pills = stats(f.to.body);

  // The heartbeat: moved by script, so a frozen page stops it. `maxGap` is the longest wait between frames.
  let last = performance.now();
  let maxGap = 0;
  let count = 0;
  const loop = (now: number): void => {
    const gap = now - last;
    last = now;
    if (gap > maxGap) {
      maxGap = gap;
      pills.set('longest freeze', `${Math.round(maxGap)} ms`, maxGap > 120 ? 'bad' : 'ok');
    }
    ring.style.transform = `rotate(${(now / 4) % 360}deg)`;
    const lap = (now % 1800) / 900; // 0..2: out and back
    dot.style.left = `${(lap > 1 ? 2 - lap : lap) * 100}%`;
    frames.textContent = `${++count} frames`;
    raf = requestAnimationFrame(loop);
  };
  let raf = requestAnimationFrame(loop);
  stage.onDispose(() => cancelAnimationFrame(raf));
  // A tab in the background does not draw frames: do not count that as a freeze.
  document.addEventListener('visibilitychange', () => (last = performance.now()), { signal: stage.signal });

  let rows = stage.preview ? 30000 : 120000;
  let csv = bigOrdersCsv(rows);
  let busy = false;
  const start = (label: string): void => {
    busy = true;
    maxGap = 0;
    last = performance.now();
    pills.clear();
    pills.set('rows', rows.toLocaleString('en'));
    pills.set('parsing on', label);
  };

  const inWorker = (): void => {
    if (busy) return;
    start('a worker');
    f.via.textContent = 'Papa.parse(csv, { worker: true })';
    stage.say('Parsing in the worker: the page keeps moving.');
    const t0 = performance.now();
    Papa.parse<Record<string, unknown>>(csv, {
      header: true,
      dynamicTyping: true,
      worker: true, // parse on another thread; the rows come back in complete
      complete: (results) => {
        busy = false;
        if (stage.disposed) return;
        pills.set('parsed', results.data.length.toLocaleString('en'), 'ok');
        pills.set('took', `${Math.round(performance.now() - t0)} ms`);
        stage.say('Parsed in the worker: the spinner never stalled.', 'ok');
      },
    });
  };

  const onPage = (): void => {
    if (busy) return;
    start('this page');
    f.via.textContent = 'Papa.parse(csv, { header: true })';
    stage.say('Parsing on the page: watch the spinner…', 'warn');
    stage.after(80, () => {
      const t0 = performance.now();
      // No worker: this line holds the whole page until it has finished.
      const results = Papa.parse<Record<string, unknown>>(csv, { header: true, dynamicTyping: true });
      pills.set('parsed', results.data.length.toLocaleString('en'), 'ok');
      pills.set('took', `${Math.round(performance.now() - t0)} ms`);
      stage.say(`The page was frozen for about ${Math.round(performance.now() - t0)} ms.`, 'bad');
      busy = false;
    });
  };

  if (stage.preview) {
    stage.play(async (wait) => {
      await wait(900);
      inWorker();
      await wait(3000);
    });
  } else {
    slider(stage.bar!, 'Rows', 20000, 600000, 20000, rows, (v) => {
      rows = v;
      csv = bigOrdersCsv(rows);
    }, (v) => v.toLocaleString('en'));
    button(stage.bar!, 'Parse in a worker', inWorker);
    button(stage.bar!, 'Parse on this page (it freezes)', onPage);
    stage.say('Pick a way to parse. The spinner shows what the page is doing.');
  }
  return stage.dispose;
};

export default mount;
