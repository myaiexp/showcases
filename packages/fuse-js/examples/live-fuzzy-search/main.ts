// Fuzzy book search: mistyped queries still find the right titles and authors
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { BOOKS } from '../../shared/data.ts';
import { marked } from '../../shared/highlight.ts';
import { resultList } from '../../shared/results.ts';
import { searchBox, typeLoop } from '../../shared/search-box.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Misspell a title or an author on purpose.' });
  const box = searchBox(stage.root, stage, { placeholder: 'Search books…', tries: ['jon', 'javscript', 'gatsbi', 'tolkein', 'mokingbird'] });
  const list = resultList(stage.root, { max: stage.preview ? 4 : 8 });

  // Search the title and author of every book. includeMatches reports which letters
  // matched, includeScore how close each match is (0 = perfect).
  const fuse = new Fuse(BOOKS, { keys: ['title', 'author'], includeMatches: true, includeScore: true });

  const run = (query: string): void => {
    if (!query.trim()) {
      list.show([], 'Type to search 16 books');
      stage.say('');
      return;
    }
    const results = fuse.search(query);
    list.show(
      results.map((r) => ({
        id: r.refIndex,
        title: marked(r, 'title', r.item.title),
        sub: marked(r, 'author', r.item.author),
        score: r.score,
      })),
    );
    stage.say(`${results.length} of ${BOOKS.length} books match "${query}"`, results.length ? 'ok' : 'warn');
  };
  box.onInput(run);
  run(box.value);
  typeLoop(stage, box, ['jon', 'javscript', 'gatsbi', 'tolkein']);
  return stage.dispose;
};

export default mount;
