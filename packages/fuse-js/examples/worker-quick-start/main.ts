// FuseWorker: the same fuzzy search, run by several Web Workers in parallel
import { FuseWorker } from 'fuse.js/worker';
import workerUrl from 'fuse.js/worker-script?url';
import type { Mount } from '@/types.ts';
import { people } from '../../shared/big-data.ts';
import { marked } from '../../shared/highlight.ts';
import { resultList } from '../../shared/results.ts';
import { searchBox, typeLoop } from '../../shared/search-box.ts';
import { createStage } from '../../shared/stage.ts';
import { pills } from '../../shared/widgets.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each keystroke is searched by every worker at once; the page never waits.' });
  const box = searchBox(stage.root, stage, { placeholder: 'Search 40,000 people…', tries: ['elena', 'kowalsky', 'sailing', 'globex'] });
  const info = pills(stage.root);
  const list = resultList(stage.root, { max: stage.preview ? 3 : 8 });

  const docs = people(stage.preview ? 8000 : 40000);
  const numWorkers = stage.preview ? 2 : 4;
  // workerUrl: the docs' 'fuse.js/worker-script' import, with Vite's ?url so the bundler
  // ships the worker file and hands back its address.
  const fuse = new FuseWorker(docs, { keys: ['name', 'email', 'company', 'description'], threshold: 0.4, includeScore: true, includeMatches: true }, { numWorkers, workerUrl });
  stage.onDispose(() => fuse.terminate());
  info.set('people', docs.length.toLocaleString('en'));
  info.set('workers', numWorkers);

  let latest = 0;
  const run = async (query: string): Promise<void> => {
    const ticket = ++latest;
    if (!query.trim()) {
      list.show([], `Type to search ${docs.length.toLocaleString('en')} people`);
      stage.say('');
      return;
    }
    const t0 = performance.now();
    // search() returns a Promise: every worker searches its shard, then the results are merged.
    const results = await fuse.search(query, { limit: 20 });
    if (ticket !== latest || stage.disposed) return; // a newer keystroke already went out
    info.set('ms', Math.round(performance.now() - t0));
    list.show(results.map((r) => ({ id: r.refIndex, title: marked(r, 'name', r.item.name), sub: marked(r, 'description', r.item.description), score: r.score })));
    stage.say(`Top ${results.length} for "${query}", searched by ${numWorkers} workers in parallel`, 'ok');
  };
  // terminate() rejects searches still in flight; that only happens on unmount.
  box.onInput((q) => void run(q).catch((err: unknown) => stage.disposed || stage.say(String(err), 'bad')));
  list.show([], `Type to search ${docs.length.toLocaleString('en')} people`);
  typeLoop(stage, box, ['elena', 'kowalsky', 'sailing']);
  return stage.dispose;
};

export default mount;
