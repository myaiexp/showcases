// A big generated File is read in slices; only running totals are kept
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { button, select } from '../../shared/controls.ts';
import { ordersCsv, textFile } from '../../shared/data.ts';
import { flow } from '../../shared/panes.ts';
import { createStage } from '../../shared/stage.ts';
import { ordersFile } from '../../shared/stream-kit.ts';
import { bigValue, fileChip, progress, size, stats } from '../../shared/widgets.ts';

const MB = 1024 * 1024;
const BYTES_PER_ROW = 34; // roughly, to turn "30 MB" into a row count
const SIZES = [[2, '2 MB'], [10, '10 MB'], [30, '30 MB']] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Make a bigger file and read it: memory use stays flat because every chunk is forgotten.' });
  const f = flow(stage, { from: 'File on disk', via: 'chunk: totals += rows of this chunk', to: 'Running totals', split: 0.4 });
  const bar = progress(f.from.body);
  const revenue = bigValue(f.to.body, 'paid orders so far');
  const pills = stats(f.to.body);
  let parser: Papa.Parser | undefined;
  let run = 0;
  // The card reads a few KB; the full view starts with 2 MB and can make a much bigger file.
  let file = stage.preview ? textFile('orders-small.csv', ordersCsv(140)) : ordersFile('orders-2mb.csv', Math.round((2 * MB) / BYTES_PER_ROW));
  if (stage.preview) f.from.body.prepend(fileChip(file));
  stage.onDispose(() => {
    run++;
    parser?.abort();
  });

  const read = (): Promise<void> =>
    new Promise((resolve) => {
      const mine = ++run;
      parser?.abort();
      const chunkSize = stage.preview ? 700 : 256 * 1024; // bytes per slice
      let orders = 0;
      let paid = 0;
      let money = 0;
      let chunks = 0;
      bar.reset();
      revenue.set('0');
      pills.set('orders', 0);
      pills.set('rows kept in memory', 0, 'ok');
      stage.say('Reading the first chunk…');
      Papa.parse<Record<string, unknown>>(file, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        chunkSize,
        // Each chunk's rows are added to the totals and then dropped: nothing else is kept.
        chunk: (results, p) => {
          if (mine !== run || stage.disposed) return;
          parser = p;
          for (const row of results.data) {
            orders++;
            if (row['paid'] === true) {
              paid++;
              money += Number(row['qty']) * Number(row['price']);
            }
          }
          chunks++;
          const done = Math.min(file.size, chunks * chunkSize);
          bar.tick(done / file.size);
          bar.set(done / file.size, `${size(done)} of ${size(file.size)}`);
          revenue.set(Math.round(money).toLocaleString('en'));
          pills.set('orders', orders.toLocaleString('en'));
          pills.set('paid', paid.toLocaleString('en'));
          pills.set('chunks', chunks);
          stage.say(`Chunk ${chunks}: ${results.data.length} rows added, then forgotten.`);
          if (stage.preview) {
            p.pause(); // a card slows it down so the bar can be seen filling
            stage.after(450, () => p.resume());
          }
        },
        complete: (results) => {
          if (mine !== run || stage.disposed) return resolve();
          const aborted = results.meta?.aborted === true;
          stage.say(aborted ? 'Stopped early.' : `Done: ${orders.toLocaleString('en')} orders totalled, none kept.`, aborted ? 'warn' : 'ok');
          resolve();
        },
      });
    });

  if (stage.preview) {
    stage.play(async (wait) => {
      await read();
      await wait(2600);
    });
  } else {
    let mb = 2;
    select(stage.bar!, 'File size', SIZES.map(([v, l]) => [v, l] as const), (v) => (mb = v), mb);
    button(stage.bar!, 'Make the file and read it', () => {
      stage.say(`Making a ${mb} MB file…`);
      stage.after(40, () => {
        file = ordersFile(`orders-${mb}mb.csv`, Math.round((mb * MB) / BYTES_PER_ROW));
        f.from.body.querySelector('.pp-file')?.remove();
        f.from.body.prepend(fileChip(file));
        void read();
      });
    });
    button(stage.bar!, 'Stop', () => parser?.abort());
    f.from.body.prepend(fileChip(file));
    void read();
  }
  return stage.dispose;
};

export default mount;
