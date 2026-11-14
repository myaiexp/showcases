// $or: a book is kept when any clause matches, shown as a truth table
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { clauseBar, type Clause } from '../../shared/logical-clauses.ts';
import { SHELF_BOOKS } from '../../shared/logical-data.ts';
import { keptBy, queryText, truthTable, type TruthTable } from '../../shared/logical-view.ts';
import { createStage } from '../../shared/stage.ts';

const KEYS = ['title', 'author', 'genre', 'year', 'color'];
const NAMES = SHELF_BOOKS.map((b) => b.title);

const PRESETS: [string, Clause[]][] = [
  ['Scalzi or old', [{ key: 'author', text: 'scalzi' }, { key: 'title', text: 'old' }]],
  ['Scalzi or Tolkien', [{ key: 'author', text: 'scalzi' }, { key: 'author', text: 'tolkien' }]],
  ['Fantasy or crime', [{ key: 'genre', text: 'fantasy' }, { key: 'genre', text: 'crime' }]],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Change a clause: a book needs a tick in at least one clause column to be kept.' });
  const code = queryText(stage.root, stage);
  const holder = document.createElement('div');
  stage.root.append(holder);
  let table: TruthTable | null = null;

  const fuse = new Fuse(SHELF_BOOKS, { keys: KEYS, includeScore: true, threshold: 0.3 });
  const clauses: Clause[] = PRESETS[0]![1].map((c) => ({ ...c }));

  const run = (): void => {
    const active = clauses.filter((c) => c.text.trim());
    if (!active.length) {
      code.set({ $or: [] });
      stage.say('Type something in a clause');
      return;
    }
    // Each clause is one { key: 'text' } object; $or keeps books that satisfy at least one of them.
    const query = { $or: active.map((c) => ({ [c.key]: c.text })) };
    const results = fuse.search(query);
    const kept = new Map(results.map((r) => [r.refIndex, r.score]));
    const each = active.map((c) => keptBy(fuse, { [c.key]: c.text }));

    code.set(query);
    holder.replaceChildren();
    table = truthTable(holder, NAMES, active.map((c) => `${c.key}: ${c.text}`), 'any');
    table.set(each, kept);
    const sizes = each.map((s) => s.size).join(' + ');
    stage.say(
      stage.preview ? `${results.length} of ${NAMES.length} books kept` : results.length ? `Clauses keep ${sizes} books on their own; together ${results.length} are kept (a book in two clauses counts once)` : 'No book matches any clause',
      results.length ? 'ok' : 'warn',
    );
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
