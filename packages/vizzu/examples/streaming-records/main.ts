// Vizzu example: records added on a timer, with a filter that keeps a sliding window
import Vizzu from 'vizzu';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { darkStyle } from '../../shared/theme.ts';
import type { Data } from 'vizzu';

// A reading every tick: Step counts the ticks so a filter can pick the latest ones.
const series: Data.Series[] = [
  { name: 'Tick', type: 'dimension' },
  { name: 'Reading', type: 'measure' },
  { name: 'Step', type: 'measure' },
];
const reading = (n: number): number => Math.round(50 + 30 * Math.sin(n / 2.3) + 12 * Math.sin(n * 1.7));
const record = (n: number): [string, number, number] => [`t${String(n).padStart(2, '0')}`, reading(n), n];
const WINDOW = 8; // markers on screen
const LIMIT = 30; // records in the data before the stream starts over

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const chart = stage.own(new Vizzu(stage.element, { style: darkStyle }));
  await chart.initializing;

  const latest = (n: number) => (r: Data.Record) => (r['Step'] as number) > n - WINDOW;
  const start = (): Data.Set => ({
    series,
    records: Array.from({ length: WINDOW }, (_, i) => record(i + 1)),
  });

  await chart.animate({
    data: { ...start(), filter: latest(WINDOW) },
    config: {
      title: 'Records arrive on a timer',
      channels: {
        x: { set: ['Tick'] },
        y: { set: ['Reading'] },
        label: { set: ['Reading'] },
        color: { set: ['Reading'] },
      },
    },
  });

  // Added records stay in the chart, so a stream that never stopped would grow for ever.
  // This one keeps a filter on the latest 8 ticks, and after 30 records it sends the data
  // set again (series and records), which replaces what the chart holds, and starts over.
  let n = WINDOW;
  const tick = stage.preview ? 1100 : 900;
  const run = async (): Promise<void> => {
    try {
      for (;;) {
        await stage.wait(tick);
        if (n >= LIMIT) {
          stage.say('Starting the stream over with a fresh data set');
          n = WINDOW;
          await chart.animate({ data: { ...start(), filter: latest(n) } });
          continue;
        }
        n += 1;
        stage.say(`Record ${n} arrives; the filter keeps ticks ${Math.max(1, n - WINDOW + 1)} to ${n}`);
        await chart.animate({ data: { records: [record(n)], filter: latest(n) } }, { duration: 0.6 });
      }
    } catch (err) {
      if (!stage.disposed) throw err;
    }
  };
  run().catch((err: unknown) => {
    if (!stage.disposed) console.error('stream failed', err);
  });
  return () => stage.dispose();
};

export default mount;
