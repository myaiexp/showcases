// Nested $and / $or drawn as a tree: each node lit for the books it keeps
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { textInput } from '../../shared/controls.ts';
import { SHELF_BOOKS } from '../../shared/logical-data.ts';
import { keptBy, queryText, queryTree, treeRows, type LQuery } from '../../shared/logical-view.ts';
import { createStage } from '../../shared/stage.ts';

const NAMES = SHELF_BOOKS.map((b) => b.title);
const FIRST = ['old war', 'old', 'the', 'lock'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each square is one book, lit where that part of the query keeps it. Click a square to follow a book.' });
  const code = stage.preview ? null : queryText(stage.root, stage);

  // Extended search is on so that '^lock' and '!arts' read as "starts with" and "does not contain".
  const fuse = new Fuse(SHELF_BOOKS, { keys: ['title', 'author'], useExtendedSearch: true, includeScore: true });
  const tree = queryTree(stage.root, fuse, NAMES);
  let first = FIRST[0]!;
  let followed = 0;

  const run = (): void => {
    // The docs' nested query: the first clause AND (starts with "lock" OR lacks "arts").
    const query: LQuery = { $and: [{ title: first }, { $or: [{ title: '^lock' }, { title: '!arts' }] }] };
    code?.set(query);
    tree.set(query, stage.preview ? undefined : (i) => ((followed = i), tree.follow(i), say(query)));
    tree.follow(followed);
    say(query);
  };
  const say = (query: LQuery): void => {
    const rows = treeRows(query);
    const title = NAMES[followed]!;
    const verdicts = rows.filter((r) => r.depth === 1).map((r) => [r, keptBy(fuse, r.query).has(followed)] as const);
    const kept = fuse.search(query as never).some((r) => r.refIndex === followed);
    const why = verdicts.map(([r, ok]) => `${r.op ?? r.label} ${ok ? '✓' : '✗'}`).join(', ');
    stage.say(`${title}: ${stage.preview ? '' : `${why} → `}${kept ? 'kept' : 'dropped'}`, kept ? 'ok' : 'info');
  };

  if (stage.preview) {
    stage.cycle(NAMES, 1700, (_, i) => {
      followed = i;
      first = FIRST[i % 2]!;
      run();
    });
  } else if (stage.bar) {
    textInput(stage.bar, 'first clause (title)', first, (v) => ((first = v), run()), 12);
    run();
  }
  return stage.dispose;
};

export default mount;
