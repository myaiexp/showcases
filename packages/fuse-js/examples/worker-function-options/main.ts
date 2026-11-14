// Each function-valued option tried in Fuse and in FuseWorker: who accepts it
import Fuse, { type IFuseOptions } from 'fuse.js';
import { FuseWorker } from 'fuse.js/worker';
import workerUrl from 'fuse.js/worker-script?url';
import type { Mount } from '@/types.ts';
import { BOOKS, type Book } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const TRIALS: { label: string; options: IFuseOptions<Book> }[] = [
  { label: "keys: ['title']", options: { keys: ['title'] } },
  { label: 'sortFn: (a, b) => …', options: { keys: ['title'], sortFn: (a, b) => a.score - b.score } },
  { label: 'getFn: (book, path) => …', options: { keys: ['title'], getFn: (book) => book.title.toLowerCase() } },
  { label: "keys: [{ name, getFn }]", options: { keys: [{ name: 'decade', getFn: (b) => `${Math.floor(b.year / 10) * 10}s` }] } },
  { label: 'tokenize: (text) => …', options: { keys: ['title'], useTokenSearch: true, tokenize: (t) => t.split(' ') } },
  { label: 'useTokenSearch: true', options: { keys: ['title'], useTokenSearch: true } },
];

/** Builds the instance and reports what happened: fine, or the error message. */
function attempt(make: () => unknown): string | null {
  try {
    const made = make();
    if (made instanceof FuseWorker) made.terminate(); // nothing is spawned until the first search
    return null;
  } catch (err) {
    return err instanceof Error ? err.message : String(err);
  }
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const rows = TRIALS.map(({ label, options }) => {
    const row = document.createElement('div');
    row.className = 'trial';
    const opt = document.createElement('span');
    opt.className = 'opt';
    opt.textContent = label;
    const inFuse = document.createElement('span');
    const inWorker = document.createElement('span');
    // The same options, handed to both classes.
    const fuseError = attempt(() => new Fuse(BOOKS, options));
    const workerError = attempt(() => new FuseWorker(BOOKS, options, { workerUrl }));
    inFuse.className = fuseError ? 'bad' : 'ok';
    inFuse.textContent = fuseError ? 'Fuse ✗' : 'Fuse ✓';
    inWorker.className = workerError ? 'bad' : 'ok';
    inWorker.textContent = workerError ? `Worker ✗ ${stage.preview ? '' : workerError}` : 'Worker ✓';
    inWorker.title = workerError ?? '';
    row.append(opt, inFuse, inWorker);
    stage.root.append(row);
    return { row, workerError, label };
  });

  stage.cycle(rows, 2000, ({ row, workerError, label }) => {
    rows.forEach((r) => (r.row.dataset['active'] = String(r.row === row)));
    stage.say(workerError ? `${label.split(':')[0]}: ${workerError.split(':')[0]}` : `${label}: fine in both`, workerError ? 'bad' : 'ok');
  }, true);
  return stage.dispose;
};

export default mount;
