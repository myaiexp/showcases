// Several keys in one object mean AND, but a key written twice collapses to the last one
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { clauseBar, type Clause } from '../../shared/logical-clauses.ts';
import { SHELF_BOOKS } from '../../shared/logical-data.ts';
import { compact } from '../../shared/logical-view.ts';
import { resultList } from '../../shared/results.ts';
import { createStage } from '../../shared/stage.ts';
import { callLine, columns } from '../../shared/widgets.ts';

const KEYS = ['title', 'author', 'genre', 'year', 'color'];

const PRESETS: [string, Clause[]][] = [
  ['Two different keys', [{ key: 'title', text: 'old' }, { key: 'genre', text: 'science' }]],
  ['The same key twice', [{ key: 'title', text: 'old' }, { key: 'title', text: 'war' }]],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick "The same key twice": an object can hold a key only once, so the first clause is lost.' });
  const cols = columns(stage, ['Implicit AND', 'Explicit $and']);
  const written = cols.map((c) => callLine(c.body));
  const sent = callLine(cols[0]!.body);
  const lists = cols.map((c) => resultList(c.body, { max: stage.preview ? 3 : 8, scores: false, ranks: false }));

  const fuse = new Fuse(SHELF_BOOKS, { keys: KEYS, threshold: 0.3 });
  const clauses: Clause[] = PRESETS[0]![1].map((c) => ({ ...c }));

  const run = (): void => {
    const active = clauses.filter((c) => c.text.trim());
    if (!active.length) return;
    // Written as code, the implicit form is { key: 'text', key: 'text' }. JavaScript builds
    // that object by keeping one value per key, which is what Fuse receives.
    const implicit = Object.fromEntries(active.map((c) => [c.key, c.text]));
    const explicit = { $and: active.map((c) => ({ [c.key]: c.text })) };
    written[0]!.set(`{ ${active.map((c) => `${c.key}: '${c.text}'`).join(', ')} }`);
    sent.set(Object.keys(implicit).length < active.length ? `Fuse receives ${compact(implicit)}` : 'Fuse receives the same object');
    written[1]!.set(compact(explicit));

    const a = fuse.search(implicit);
    const b = fuse.search(explicit);
    const rows = (rs: typeof a) => rs.map((r) => ({ id: r.refIndex, title: r.item.title }));
    lists[0]!.show(rows(a), 'no books');
    lists[1]!.show(rows(b), 'no books');
    const lost = Object.keys(implicit).length < active.length;
    stage.say(
      stage.preview ? `implicit: ${a.length}, $and: ${b.length}` : lost ? `Same key twice: implicit keeps ${a.length} books (only the last clause), $and keeps ${b.length}` : `Different keys: both forms keep the same ${a.length} books`,
      lost ? 'warn' : 'ok',
    );
  };

  if (stage.preview) {
    stage.cycle(PRESETS, 2800, ([, set]) => {
      clauses.splice(0, clauses.length, ...set.map((c) => ({ ...c })));
      run();
    });
  } else if (stage.bar) {
    clauseBar(stage.bar, clauses, KEYS, PRESETS, run);
    run();
  }
  return stage.dispose;
};

export default mount;
