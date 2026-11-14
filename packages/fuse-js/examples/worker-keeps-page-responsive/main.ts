// Plain Fuse vs FuseWorker on a big list, with a ball per lane to show any freeze
import Fuse from 'fuse.js';
import { FuseWorker } from 'fuse.js/worker';
import workerUrl from 'fuse.js/worker-script?url';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { people } from '../../shared/big-data.ts';
import { createStage } from '../../shared/stage.ts';
import { pills } from '../../shared/widgets.ts';
import { lane } from './lane.ts';
import './style.css';

const KEYS = ['name', 'email', 'company', 'description'];
const QUERIES = ['kowalsky', 'birdwatchng', 'globx', 'elena moro'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The balls are moved by the page itself every frame. If one stops, the page is frozen.' });
  const lanes = document.createElement('div');
  lanes.className = 'lanes';
  stage.root.append(lanes);
  // A card never runs the main-thread side: it would freeze the whole gallery page.
  const pageLane = stage.preview ? null : lane(lanes, 'Fuse, on the page');
  const numWorkers = stage.preview ? 2 : 4;
  const workerLane = lane(lanes, `FuseWorker, on ${numWorkers} background threads`);
  stage.onDispose(() => (pageLane?.stop(), workerLane.stop()));
  const info = pills(stage.root);

  const docs = people(stage.preview ? 20000 : 60000);
  info.set('people', docs.length.toLocaleString('en'));
  const options = { keys: KEYS, includeScore: true };
  const worker = new FuseWorker(docs, options, { numWorkers, workerUrl });
  stage.onDispose(() => worker.terminate());
  let n = 0;
  const nextQuery = (): string => QUERIES[n++ % QUERIES.length]!;
  let busy = false;

  const inWorkers = async (): Promise<void> => {
    if (busy) return;
    busy = true;
    const query = nextQuery();
    workerLane.begin();
    stage.say(`FuseWorker is searching for "${query}"…`);
    const t0 = performance.now();
    // Awaited: the search runs in the workers while this page keeps drawing frames.
    const results = await worker.search(query, { limit: 10 }).finally(() => workerLane.end());
    busy = false;
    if (stage.disposed) return;
    info.set('found', results.length);
    info.set('ms', Math.round(performance.now() - t0));
    stage.say(`Workers: "${query}" searched, ball never stopped (longest pause ${Math.round(workerLane.worst)} ms)`, 'ok');
  };

  let fuse: Fuse<(typeof docs)[number]> | null = null;
  const onPage = (): void => {
    if (busy || !pageLane) return;
    const query = nextQuery();
    stage.say(`Fuse is searching for "${query}" on the page…`);
    // Let the message paint, then block: building the index and searching run on this thread.
    stage.after(50, () => {
      pageLane.begin();
      const t0 = performance.now();
      fuse ??= new Fuse(docs, options);
      const results = fuse.search(query, { limit: 10 });
      // The frame that ends the freeze has not been drawn yet: stop measuring after it.
      requestAnimationFrame(() => pageLane.end());
      info.set('found', results.length);
      info.set('ms', Math.round(performance.now() - t0));
      stage.after(100, () => stage.say(`Page: "${query}" froze the ball for ${Math.round(pageLane.worst)} ms`, pageLane.worst > 150 ? 'bad' : 'ok'));
    });
  };

  const fail = (err: unknown): void => {
    busy = false;
    if (!stage.disposed) stage.say(String(err), 'bad');
  };
  if (stage.preview) {
    stage.every(2600, () => void inWorkers().catch(fail));
    stage.after(400, () => void inWorkers().catch(fail));
  } else if (stage.bar) {
    button(stage.bar, 'Search with Fuse (page)', onPage);
    button(stage.bar, 'Search with FuseWorker', () => void inWorkers().catch(fail));
    stage.say('Press a button. The first worker search also starts the workers.');
  }
  return stage.dispose;
};

export default mount;
