// debounce(delay, fn): a burst of calls collapses into one after the quiet gap
import * as vega from 'vega';
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { button, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  // Grey ticks are calls to the debounced function; orange ticks are the times fn really ran.
  // Time scrolls left: x = seconds since the event, over a six second window.
  const spec: Spec = {
    width: 460,
    height: 90,
    padding: 8,
    signals: [{ name: 'now', value: 0 }],
    data: [
      { name: 'events', values: [], transform: [{ type: 'filter', expr: 'datum.t > now - 6' }] },
    ],
    scales: [
      { name: 'x', type: 'linear', domain: { signal: '[now - 6, now]' }, range: 'width' },
      { name: 'y', type: 'point', domain: ['call', 'fire'], range: [20, 70] },
    ],
    axes: [
      { orient: 'left', scale: 'y', domain: false, ticks: false },
      { orient: 'bottom', scale: 'x', tickCount: 6, format: '.0f', title: 'seconds' },
    ],
    marks: [
      {
        type: 'rect',
        from: { data: 'events' },
        encode: {
          update: {
            x: { scale: 'x', field: 't' },
            width: { value: 3 },
            yc: { scale: 'y', field: 'kind' },
            height: { signal: 'datum.kind == "fire" ? 34 : 18' },
            fill: { signal: 'datum.kind == "fire" ? "#f59e0b" : "#8b93a3"' },
          },
        },
      },
    ],
  };
  const view = await stage.render(spec);

  const t0 = performance.now();
  const pending: { t: number; kind: string }[] = [];
  const sec = (): number => (performance.now() - t0) / 1000;
  let delay = 300;
  let calls = 0;
  const make = (): ((arg: number) => void) =>
    vega.debounce(delay, () => {
      if (!stage.disposed) pending.push({ t: sec(), kind: 'fire' });
    });
  let debounced = make();
  const call = (): void => {
    pending.push({ t: sec(), kind: 'call' });
    calls++;
    debounced(calls);
  };

  let busy = false;
  stage.every(100, async (i) => {
    // Cards type a burst of six calls, then pause; the full view waits for the button.
    if (stage.preview && i % 22 < 6) call();
    if (busy) return;
    busy = true;
    try {
      const rows = pending.splice(0);
      view.signal('now', sec());
      if (rows.length) view.insert('events', rows);
      await view.runAsync();
    } finally {
      busy = false;
    }
  });

  if (stage.bar) {
    slider(stage.bar, 'delay (ms)', [50, 1200, 50], delay, (v) => {
      delay = v;
      debounced = make();
    });
    button(stage.bar, 'Call once', call);
    button(stage.bar, 'Burst of 8', () => {
      for (let k = 0; k < 8; k++) setTimeout(() => !stage.disposed && call(), k * 70);
    });
  }
  return () => stage.dispose();
};

export default mount;
