// One file read with three chunk sizes: how many chunk calls, how many rows
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { ordersCsv, textFile } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';
import { strip } from '../../shared/stream-kit.ts';
import { fileChip } from '../../shared/widgets.ts';

const TEXT = ordersCsv(14);
const SIZES = [32, 100, 400];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The last bar is yours: drag the slider and see how the callbacks change.' });
  const file = textFile('orders.csv', TEXT); // stands in for a file the reader picked
  if (!stage.preview) stage.root.append(fileChip(file));
  let custom = 200;
  const sizes = stage.preview ? SIZES : [...SIZES, custom];
  const labels = sizes.map(() => document.createElement('div'));
  const strips = sizes.map((_, i) => {
    const holder = document.createElement('div');
    stage.root.append(labels[i]!, holder);
    return strip(holder, TEXT.length);
  });

  /** Reads the file with one chunk size and returns the rows in each chunk callback. */
  const readChunks = (chunkSize: number): Promise<number[]> =>
    new Promise((resolve) => {
      const perChunk: number[] = [];
      Papa.parse<Record<string, unknown>>(file, {
        header: true,
        chunkSize, // bytes per slice
        chunk: (results) => perChunk.push(results.data.length), // one call per slice
        complete: () => resolve(perChunk),
      });
    });

  let run = 0;
  const show = async (wait: (ms: number) => Promise<void>): Promise<void> => {
    const mine = ++run;
    const all = await Promise.all(sizes.map(readChunks));
    if (stage.disposed || mine !== run) return;
    strips.forEach((s) => s.reset());
    labels.forEach((l, i) => {
      l.textContent = `chunkSize ${sizes[i]}: ${all[i]!.length} calls, up to ${Math.max(...all[i]!)} rows`;
    });
    stage.say('Small slices: many callbacks. Big slices: few.');
    const most = Math.max(...all.map((a) => a.length));
    for (let n = 0; n < most; n++) {
      all.forEach((perChunk, i) => {
        if (n < perChunk.length) strips[i]!.add(n * sizes[i]!, (n + 1) * sizes[i]!, String(perChunk[n]));
      });
      await wait(stage.preview ? 140 : 90);
      if (mine !== run) return;
    }
    stage.say(`The big slice read the file in ${all[all.length - 1]!.length} callbacks; the small one needed ${all[0]!.length}.`, 'ok');
  };

  if (stage.preview) {
    stage.play(async (wait) => {
      await show(wait);
      await wait(2800);
    });
  } else {
    slider(stage.bar!, 'Your chunkSize', 16, 500, 4, custom, (v) => {
      custom = v;
      sizes[3] = v;
      void show(stage.wait).catch(() => undefined);
    }, (v) => `${v} bytes`);
    void show(stage.wait).catch(() => undefined);
  }
  return stage.dispose;
};

export default mount;
