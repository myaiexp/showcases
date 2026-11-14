// Times one query with Fuse and with FuseWorker on 1, 2 and 4 workers
import Fuse from 'fuse.js';
import { FuseWorker } from 'fuse.js/worker';
import workerUrl from 'fuse.js/worker-script?url';
import type { Mount } from '@/types.ts';
import { bars } from '../../shared/bars.ts';
import { benchDocs } from '../../shared/big-data.ts';
import { button, select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const KEYS = ['title', 'description', 'category', 'tags'];
const QUERY = 'javascrpt';
const ALL_SETUPS = [0, 1, 2, 4]; // 0 = plain Fuse on the page

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Times are for this device; the first worker search also starts the workers, so it is not counted.' });
  // A card leaves out plain Fuse: it would block the whole gallery page while it runs.
  const SETUPS = stage.preview ? ALL_SETUPS.slice(1) : ALL_SETUPS;
  const chart = bars(stage.root, SETUPS.map((n) => (n === 0 ? 'Fuse (page)' : `${n} worker${n > 1 ? 's' : ''}`)));

  let size = stage.preview ? 5000 : 50000;
  const live = new Set<FuseWorker<unknown>>();
  stage.onDispose(() => live.forEach((w) => w.terminate()));

  const time = async (n: number, docs: ReturnType<typeof benchDocs>): Promise<number> => {
    const options = { keys: KEYS, threshold: 0.4 };
    if (n === 0) {
      const fuse = new Fuse(docs, options);
      const t0 = performance.now();
      fuse.search(QUERY);
      return performance.now() - t0;
    }
    const fuse = new FuseWorker(docs, options, { numWorkers: n, workerUrl });
    live.add(fuse);
    try {
      await fuse.search('warm up'); // starts the workers and sends them their shards
      const t0 = performance.now();
      await fuse.search(QUERY);
      return performance.now() - t0;
    } finally {
      fuse.terminate();
      live.delete(fuse);
    }
  };

  let running = false;
  const runAll = async (): Promise<void> => {
    if (running) return;
    running = true;
    chart.clear();
    const docs = benchDocs(size);
    const times: number[] = [];
    for (const [i, n] of SETUPS.entries()) {
      stage.say(`Timing ${n === 0 ? 'Fuse on the page' : `${n} worker(s)`} on ${size.toLocaleString('en')} docs…`);
      await stage.wait(60); // let the label paint before a blocking run
      times[i] = await time(n, docs);
      chart.set(i, times[i]!);
    }
    running = false;
    const best = SETUPS[times.indexOf(Math.min(...times))]!;
    stage.say(`Fastest here: ${best === 0 ? 'plain Fuse' : `${best} worker${best > 1 ? 's' : ''}`} (${navigator.hardwareConcurrency} cores reported)`, 'ok');
  };
  const fail = (err: unknown): void => {
    running = false;
    if (!stage.disposed) stage.say(String(err), 'bad');
  };

  if (stage.preview) {
    stage.after(300, () => void runAll().catch(fail));
    stage.every(9000, () => void runAll().catch(fail));
  }
  else if (stage.bar) {
    select(stage.bar, 'docs', [10000, 50000, 100000].map((n) => [n, n.toLocaleString('en')] as const), (n) => (size = n), size);
    button(stage.bar, 'Run the timings', () => void runAll().catch(fail));
    stage.say('Press "Run the timings". Plain Fuse blocks the page while it runs.');
  }
  return stage.dispose;
};

export default mount;
