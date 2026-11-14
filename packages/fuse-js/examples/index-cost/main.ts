// Times new Fuse() on the same docs as strings, with 1 key, 4 keys, and token search
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { bars } from '../../shared/bars.ts';
import { benchDocs } from '../../shared/big-data.ts';
import { button, select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const KEYS = ['title', 'description', 'category', 'tags'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Times are for this device and include building the whole index.' });
  const chart = bars(stage.root, ['strings only', "keys: ['title']", '4 keys', '4 keys + useTokenSearch']);
  let size = stage.preview ? 600 : 10000;

  const time = (build: () => unknown): number => {
    const t0 = performance.now();
    build();
    return performance.now() - t0;
  };
  const runAll = async (): Promise<void> => {
    chart.clear();
    const docs = benchDocs(size);
    const titles = docs.map((d) => d.title);
    // Each bar is one constructor call: building the index is all new Fuse() does.
    const builds = [
      () => new Fuse(titles),
      () => new Fuse(docs, { keys: ['title'] }),
      () => new Fuse(docs, { keys: KEYS }),
      () => new Fuse(docs, { keys: KEYS, useTokenSearch: true }),
    ];
    for (const [i, build] of builds.entries()) {
      await stage.wait(40); // one build per frame, so the bars fill in turn
      chart.set(i, time(build));
    }
    stage.say(`Index for ${size.toLocaleString('en')} items: more keys and token search mean more work up front`, 'ok');
  };
  const fail = (err: unknown): void => {
    if (!stage.disposed) stage.say(String(err), 'bad');
  };

  if (stage.preview) {
    stage.play(async (wait) => {
      await runAll();
      await wait(6000);
    });
  } else if (stage.bar) {
    select(stage.bar, 'items', [1000, 10000, 50000].map((n) => [n, n.toLocaleString('en')] as const), (n) => (size = n), size);
    button(stage.bar, 'Build the indexes', () => void runAll().catch(fail));
    void runAll().catch(fail);
  }
  return stage.dispose;
};

export default mount;
