// A worker streams a big file; parser.abort() stops it from step or a button
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { button, slider } from '../../shared/controls.ts';
import { flow } from '../../shared/panes.ts';
import { createStage } from '../../shared/stage.ts';
import { ordersFile, ticker } from '../../shared/stream-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Press Abort while rows are streaming in, or set a row number to stop at automatically.' });
  const f = flow(stage, { from: 'Worker thread', via: 'parser.abort()', to: 'Page thread: step receives rows', split: 0.3 });
  const worker = document.createElement('div');
  f.from.show(worker);
  const tick = ticker(f.to.body, stage.preview ? 2 : 3);

  const total = stage.preview ? 40000 : 400000;
  let stopAt = stage.preview ? 14000 : 0; // abort when this many rows have arrived (0: only the button)
  let file: File | undefined;
  let run = 0;
  let parser: Papa.Parser | undefined;
  let received = 0;
  let latest: Record<string, unknown>[] = [];
  let dirty = false;
  stage.onDispose(() => {
    run++;
    parser?.abort();
  });
  stage.every(70, () => {
    if (!dirty) return;
    dirty = false;
    tick.stats.set('rows received', received.toLocaleString('en'));
    tick.bar.set(received / total, `${received.toLocaleString('en')} of ${total.toLocaleString('en')} rows`);
    tick.rows(latest);
  });

  const start = (): Promise<void> =>
    new Promise((resolve) => {
      const mine = ++run;
      parser?.abort();
      parser = undefined;
      file ??= ordersFile('orders.csv', total);
      received = 0;
      latest = [];
      tick.bar.reset();
      tick.stats.clear();
      worker.textContent = 'worker: reading and parsing…';
      stage.say('The worker is streaming rows…');
      Papa.parse<Record<string, unknown>>(file, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        worker: true,
        chunkSize: stage.preview ? 100_000 : 300_000,
        step: (results, p) => {
          if (mine !== run || stage.disposed) {
            p.abort();
            return;
          }
          parser = p;
          received++;
          latest.push(results.data);
          if (latest.length > 3) latest.shift();
          dirty = true;
          // Stopping from inside step: the worker is shut down at once.
          if (stopAt > 0 && received >= stopAt) {
            stage.say(`step called abort() at row ${received.toLocaleString('en')}.`, 'warn');
            p.abort();
          }
        },
        // abort() also ends up here, with meta.aborted set and no rows.
        complete: (results) => {
          if (mine !== run || stage.disposed) return resolve();
          dirty = true;
          const aborted = results.meta?.aborted === true;
          tick.stats.set('meta.aborted', String(aborted), aborted ? 'warn' : 'ok');
          worker.textContent = aborted ? 'worker: stopped, the rest is never read' : 'worker: finished';
          stage.say(
            aborted ? `Stopped at row ${received.toLocaleString('en')}: ${(total - received).toLocaleString('en')} rows never arrived.` : 'It finished before it was stopped.',
            aborted ? 'warn' : 'ok',
          );
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
    slider(stage.bar!, 'Stop automatically at row', 0, 400000, 10000, stopAt, (v) => (stopAt = v), (v) => (v ? v.toLocaleString('en') : 'never'));
    button(stage.bar!, 'Parse in the worker', () => void start());
    button(stage.bar!, 'Abort', () => parser?.abort());
    void start();
  }
  return stage.dispose;
};

export default mount;
