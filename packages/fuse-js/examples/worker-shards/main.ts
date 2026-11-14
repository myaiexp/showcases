// FuseWorker shards: which worker found each result, and how the answers merge
import { FuseWorker } from 'fuse.js/worker';
import workerUrl from 'fuse.js/worker-script?url';
import type { Mount } from '@/types.ts';
import { people } from '../../shared/big-data.ts';
import { select } from '../../shared/controls.ts';
import { marked } from '../../shared/highlight.ts';
import { resultList } from '../../shared/results.ts';
import { searchBox } from '../../shared/search-box.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const COLORS = ['var(--blue)', 'var(--green)', 'var(--orange)', 'var(--purple)', 'var(--cyan)', 'var(--red)'];
const CARD_STEPS = [
  { workers: 2, query: 'nora tanaka' },
  { workers: 3, query: 'nora tanaka' },
  { workers: 4, query: 'chess' },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Change the number of workers: the shards change, the ranking does not.' });
  const box = searchBox(stage.root, stage, { value: 'nora tanaka', tries: ['nora tanaka', 'chess', 'umbrela', 'pilot'] });
  const strip = document.createElement('div');
  strip.className = 'shards';
  stage.root.append(strip);
  const list = resultList(stage.root, { max: stage.preview ? 4 : 10 });
  const docs = people(stage.preview ? 3000 : 12000, 11);

  let fuse: FuseWorker<(typeof docs)[number]> | null = null;
  let numWorkers = 3;
  let latest = 0;
  stage.onDispose(() => fuse?.terminate());

  const run = async (): Promise<void> => {
    const ticket = ++latest;
    if (!box.value.trim()) {
      // An empty query returns everyone unscored: there is no ranking to split.
      strip.replaceChildren();
      list.show([], 'Type a name, a hobby or a job');
      stage.say('');
      return;
    }
    // The docs: the dataset is split evenly, each worker gets one contiguous shard.
    const size = Math.ceil(docs.length / numWorkers);
    const shardOf = (refIndex: number): number => Math.floor(refIndex / size);
    let results;
    try {
      results = await fuse!.search(box.value, { limit: 12 });
    } catch (err) {
      // Switching worker counts terminates the old FuseWorker, which rejects its searches.
      if (ticket !== latest || stage.disposed) return;
      throw err;
    }
    if (ticket !== latest || stage.disposed) return;
    const found = new Array<number>(numWorkers).fill(0);
    results.forEach((r) => found[shardOf(r.refIndex)]!++);
    strip.replaceChildren(
      ...found.map((count, i) => {
        const s = document.createElement('div');
        s.className = 'shard';
        s.style.setProperty('--shard', COLORS[i % COLORS.length]!);
        const b = document.createElement('b');
        b.textContent = `worker ${i + 1}`;
        s.append(b, ` ${count} of top ${results.length}`);
        s.title = `items ${(i * size).toLocaleString('en')}–${Math.min(docs.length, (i + 1) * size - 1).toLocaleString('en')}`;
        return s;
      }),
    );
    list.show(results.map((r) => ({ id: r.refIndex, title: marked(r, 'name', r.item.name), sub: r.item.description, badge: `#${r.refIndex}`, score: r.score })));
    list.el.querySelectorAll<HTMLElement>('.fz-row').forEach((row, i) => {
      row.style.setProperty('--shard', COLORS[shardOf(results[i]!.refIndex) % COLORS.length]!);
    });
    stage.say(`${numWorkers} workers each searched ${size.toLocaleString('en')} people; results merged by score`, 'ok');
  };

  const start = (workers: number): void => {
    fuse?.terminate();
    numWorkers = workers;
    // numWorkers decides how many shards (and threads) there are.
    fuse = new FuseWorker(docs, { keys: ['name', 'description'], includeScore: true, includeMatches: true }, { numWorkers, workerUrl });
  };
  const fail = (err: unknown): void => {
    if (!stage.disposed) stage.say(String(err), 'bad');
  };

  if (stage.preview) {
    stage.cycle(CARD_STEPS, 3000, (step) => {
      start(step.workers);
      box.set(step.query);
      void run().catch(fail);
    });
  } else if (stage.bar) {
    select(stage.bar, 'numWorkers', [1, 2, 3, 4, 6].map((n) => [n, String(n)] as const), (n) => (start(n), void run().catch(fail)), 3);
    start(3);
    box.onInput(() => void run().catch(fail));
    void run().catch(fail);
  }
  return stage.dispose;
};

export default mount;
