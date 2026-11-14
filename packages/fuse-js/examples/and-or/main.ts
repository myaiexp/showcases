// Spaces mean AND, "|" means OR: the docs' "'Man 'Old | Artist$" over sixteen books
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { BOOKS as ALL_BOOKS } from '../../shared/data.ts';
import { groupOf } from '../../shared/ext-query.ts';
import { reading } from '../../shared/ext-reading.ts';
import { lightUp } from '../../shared/ext-shelf.ts';
import { searchBox } from '../../shared/search-box.ts';
import { shelf } from '../../shared/shelf.ts';
import { createStage } from '../../shared/stage.ts';

const QUERIES = ["'Man 'Old | Artist$", "'Man 'Old", 'Artist$', "^The | 'World", "'the 'of | ^Dune"];

const mount: Mount = (el, ctx) => {
  const BOOKS = ctx.preview ? ALL_BOOKS.slice(0, 13) : ALL_BOOKS;
  const stage = createStage(el, ctx, { hint: 'A tile’s small number and colour say which OR group found it. Try your own: spaces join, | separates.' });
  const box = searchBox(stage.root, stage, { placeholder: "Try 'Man 'Old | Artist$", tries: QUERIES });
  const read = reading(stage.root);
  const tiles = shelf(stage.root, BOOKS.map((b, id) => ({ id, label: b.title })), { scores: false });

  const fuse = new Fuse(BOOKS, { useExtendedSearch: true, keys: ['title'] });

  const run = (query: string): void => {
    const groups = read.set(query);
    if (!groups.length) {
      lightUp(tiles, null);
      stage.say('Type a query: words with spaces between them, groups separated by |');
      return;
    }
    const results = fuse.search(query);
    // Fuse stops at the first OR group that matches an item; groupOf asks each group in turn.
    const found = groupOf(fuse, groups);
    lightUp(tiles, results, { groups: found });
    const counts = groups.map((_, i) => [...found.values()].filter((g) => g === i).length);
    stage.say(
      groups.length > 1
        ? `${results.length} of ${BOOKS.length} books: ${counts.map((c, i) => (stage.preview ? `group ${i + 1}: ${c}` : `group ${i + 1} found ${c}`)).join(', ')}`
        : `${results.length} of ${BOOKS.length} books match${stage.preview ? '' : ' every word in the group'}`,
      results.length ? 'ok' : 'warn',
    );
  };
  box.onInput(run);

  const show = stage.cycle(QUERIES, 3000, (q) => box.set(q));
  let n = 0;
  if (!stage.preview) button(stage.bar!, 'Next example', () => show(++n));
  return stage.dispose;
};

export default mount;
