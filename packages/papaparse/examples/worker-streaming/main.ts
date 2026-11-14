// A worker reads a File in slices and streams rows to step on the page
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { button, slider } from '../../shared/controls.ts';
import { flow } from '../../shared/panes.ts';
import { createStage } from '../../shared/stage.ts';
import { ordersFile, ticker } from '../../shared/stream-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Rows are sent back slice by slice. Only the latest rows and the totals are kept on the page.' });
  const f = flow(stage, { from: 'Worker thread', via: 'worker: true + step', to: 'Page thread: step receives rows', split: 0.3 });
  const worker = document.createElement('div');
  worker.textContent = 'reading the file in slices, parsing…';
  f.from.show(worker);
  const tick = ticker(f.to.body, stage.preview ? 2 : 4);

  let total = stage.preview ? 40000 : 200000;
  let chunkSize = stage.preview ? 100_000 : 400_000; // bytes per slice the worker reads
  let file: File | undefined;
  let run = 0;
  let parser: Papa.Parser | undefined;
  let received = 0;
  let money = 0;
  let latest: Record<string, unknown>[] = [];
  let dirty = false;
  stage.onDispose(() => {
    run++;
    parser?.abort(); // ends the worker
  });
  // Rows can arrive thousands at a time: draw a few times a second, not per row.
  stage.every(70, () => {
    if (!dirty) return;
    dirty = false;
    tick.stats.set('rows received', received.toLocaleString('en'));
    tick.stats.set('revenue so far', Math.round(money).toLocaleString('en'));
    tick.bar.set(received / total, `${received.toLocaleString('en')} of ${total.toLocaleString('en')}`);
    tick.rows(latest);
  });

  const start = (): Promise<void> =>
    new Promise((resolve) => {
      const mine = ++run;
      parser?.abort();
      if (!file || file.size === 0 || file.name !== `${total}.csv`) file = ordersFile(`${total}.csv`, total);
      received = 0;
      money = 0;
      latest = [];
      tick.bar.reset();
      tick.stats.clear();
      worker.textContent = 'reading the file in slices, parsing…';
      stage.say('The worker starts reading the file…');
      Papa.parse<Record<string, unknown>>(file, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        worker: true, // parse on another thread
        chunkSize, // the worker reads the file this many bytes at a time
        // Runs on the page, once per row, as each slice comes back from the worker.
        step: (results, p) => {
          if (mine !== run || stage.disposed) {
            p.abort();
            return;
          }
          parser = p;
          received++;
          if (results.data['paid'] === true) money += Number(results.data['qty']) * Number(results.data['price']);
          latest.push(results.data);
          if (latest.length > 4) latest.shift();
          dirty = true;
        },
        complete: (results) => {
          if (mine !== run || stage.disposed) return resolve();
          dirty = true;
          tick.stats.set('rows in complete', results.data?.length ?? 0, 'warn');
          worker.textContent = 'finished: worker closed';
          stage.say(`All ${received.toLocaleString('en')} rows streamed back. complete got none.`, 'ok');
          resolve();
        },
      });
    });

  if (stage.preview) {
    stage.play(async (wait) => {
      await wait(300);
      await start();
      await wait(2600);
    });
  } else {
    slider(stage.bar!, 'Rows', 10000, 600000, 10000, total, (v) => (total = v), (v) => v.toLocaleString('en'));
    slider(stage.bar!, 'Slice', 50, 1000, 50, chunkSize / 1000, (v) => (chunkSize = v * 1000), (v) => `${v} KB`);
    button(stage.bar!, 'Parse in the worker', () => void start());
    void start();
  }
  return stage.dispose;
};

export default mount;
