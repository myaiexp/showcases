// Logical clauses with extended operators (^, ', !): plain Fuse reads them as letters
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
  ['^Old + \'Scalzi', [{ key: 'title', text: '^Old' }, { key: 'author', text: "'Scalzi" }]],
  ['^Old + !red', [{ key: 'title', text: '^Old' }, { key: 'color', text: '!red' }]],
  ['^The + !fantasy', [{ key: 'title', text: '^The' }, { key: 'genre', text: '!fantasy' }]],
  ['=Crime + ^20', [{ key: 'genre', text: '=Crime' }, { key: 'year', text: '^20' }]],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Operators: ^ starts with, \' contains, ! does not contain, = exactly.' });
  const cols = columns(stage, ['Plain Fuse', 'useExtendedSearch']);
  const lines = cols.map((c) => callLine(c.body));
  const lists = cols.map((c) => resultList(c.body, { max: stage.preview ? 3 : 8, scores: false, ranks: false }));

  // The same two options objects, except for one flag.
  const plain = new Fuse(SHELF_BOOKS, { keys: KEYS, threshold: 0.3 });
  const extended = new Fuse(SHELF_BOOKS, { keys: KEYS, threshold: 0.3, useExtendedSearch: true });
  const clauses: Clause[] = PRESETS[0]![1].map((c) => ({ ...c }));

  const run = (): void => {
    const active = clauses.filter((c) => c.text.trim());
    if (!active.length) return;
    const query = { $and: active.map((c) => ({ [c.key]: c.text })) };
    const a = plain.search(query);
    const b = extended.search(query);
    lines[0]!.set(compact(query));
    lines[1]!.set(compact(query));
    const rows = (rs: typeof a) => rs.map((r) => ({ id: r.refIndex, title: r.item.title }));
    lists[0]!.show(rows(a), 'no books');
    lists[1]!.show(rows(b), 'no books');
    stage.say(stage.preview ? `plain ${a.length}, extended ${b.length}` : `Same query: plain Fuse keeps ${a.length}, extended search keeps ${b.length}${b.length ? ` (${b.map((r) => r.item.title).join(', ')})` : ''}`, 'info');
  };

  if (stage.preview) {
    stage.cycle(PRESETS, 2600, ([, set]) => {
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
