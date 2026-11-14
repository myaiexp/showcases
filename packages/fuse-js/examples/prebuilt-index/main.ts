// new Fuse() with and without an index made beforehand by Fuse.createIndex
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { bars } from '../../shared/bars.ts';
import { benchDocs } from '../../shared/big-data.ts';
import { button, select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { pills } from '../../shared/widgets.ts';

const KEYS = ['title', 'description', 'category', 'tags'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The ready-made index is built once, then reused by every new Fuse().' });
  const chart = bars(stage.root, ['new Fuse(list, options)', 'Fuse.createIndex(keys, list)', 'new Fuse(list, options, index)']);
  const info = pills(stage.root);
  let size = stage.preview ? 600 : 20000;

  const time = <T>(fn: () => T): [T, number] => {
    const t0 = performance.now();
    const out = fn();
    return [out, performance.now() - t0];
  };
  const runAll = async (): Promise<void> => {
    chart.clear();
    const list = benchDocs(size);
    await stage.wait(40);
    // Without an index, the constructor builds one before it returns.
    chart.set(0, time(() => new Fuse(list, { keys: KEYS }))[1]);
    await stage.wait(40);
    // The same work, done separately: this can run earlier, once.
    const [index, built] = time(() => Fuse.createIndex(KEYS, list));
    chart.set(1, built, '(once)');
    await stage.wait(40);
    // With the index handed in, the constructor has nothing left to build.
    const [fuse, made] = time(() => new Fuse(list, { keys: KEYS }, index));
    chart.set(2, made);
    info.set('items', size.toLocaleString('en'));
    info.set('found "javascript"', fuse.search('javascript', { limit: 5 }).length, 'ok');
    stage.say('With a ready index, creating the search takes almost no time', 'ok');
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
    select(stage.bar, 'items', [5000, 20000, 50000].map((n) => [n, n.toLocaleString('en')] as const), (n) => (size = n), size);
    button(stage.bar, 'Time it', () => void runAll().catch(fail));
    void runAll().catch(fail);
  }
  return stage.dispose;
};

export default mount;
