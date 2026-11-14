// The same orders CSV parsed with fastMode on and off, timed
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { button, slider } from '../../shared/controls.ts';
import { csvView } from '../../shared/csv-view.ts';
import { ordersCsv } from '../../shared/data.ts';
import { pane } from '../../shared/panes.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Try more rows. Timings change a little on every run, but the gap grows with the size.' });
  const input = pane('CSV text: the same orders for both runs');
  const bars = document.createElement('div');
  bars.className = 'bars';
  stage.root.append(input.el, bars);

  const rowFor = (label: string): { fill: HTMLElement; ms: HTMLElement } => {
    const name = document.createElement('span');
    name.textContent = label;
    const track = document.createElement('div');
    track.className = 'track';
    const fill = document.createElement('div');
    fill.className = 'fill';
    track.append(fill);
    const ms = document.createElement('span');
    ms.className = 'ms';
    bars.append(name, track, ms);
    return { fill, ms };
  };
  const fast = rowFor('fastMode: true ');
  const careful = rowFor('fastMode: false');
  careful.fill.classList.add('slow');

  let rows = stage.preview ? 2000 : 20000;
  const run = (): void => {
    const text = ordersCsv(rows);
    input.show(csvView(text, { maxLines: stage.preview ? 2 : 4 }));
    // The call being timed: the same text, fastMode forced one way and then the other.
    const time = (fastMode: boolean): number => {
      let best = Infinity;
      for (let i = 0; i < 3; i++) {
        const t = performance.now();
        Papa.parse(text, { fastMode });
        best = Math.min(best, performance.now() - t);
      }
      return best;
    };
    time(true); // warm-up, so neither side pays for the first run
    const a = time(true);
    const b = time(false);
    const top = Math.max(a, b, 0.01);
    fast.fill.style.width = `${(a / top) * 100}%`;
    careful.fill.style.width = `${(b / top) * 100}%`;
    fast.ms.textContent = `${a.toFixed(1)} ms`;
    careful.ms.textContent = `${b.toFixed(1)} ms`;
    const ratio = b / Math.max(a, 0.01);
    const count = rows.toLocaleString('en');
    stage.say(ratio > 1.15 ? `Fast mode took ${(100 / ratio).toFixed(0)}% of the time on ${count} rows.` : `About the same on ${count} rows.`, ratio > 1.15 ? 'ok' : 'info');
  };

  if (stage.preview) {
    // One timing shortly after mount, then a fresh one every few seconds.
    stage.after(400, run);
    stage.every(6000, run);
  } else {
    let pending: ReturnType<typeof setTimeout> | undefined;
    stage.onDispose(() => clearTimeout(pending));
    stage.after(50, run);
    slider(stage.bar!, 'rows', 1000, 100000, 1000, rows, (v) => {
      rows = v;
      clearTimeout(pending);
      pending = setTimeout(run, 150);
    }, (v) => v.toLocaleString('en'));
    button(stage.bar!, 'Run again', run);
  }
  return stage.dispose;
};

export default mount;
