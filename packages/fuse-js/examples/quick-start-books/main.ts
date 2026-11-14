// The Quick Start: a few books, keys title and author, one search call
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { BOOKS } from '../../shared/data.ts';
import { marked } from '../../shared/highlight.ts';
import { resultList } from '../../shared/results.ts';
import { searchBox, typeLoop } from '../../shared/search-box.ts';
import { createStage } from '../../shared/stage.ts';
import { callLine, q } from '../../shared/widgets.ts';

const books = BOOKS.slice(0, 5);
const QUERIES = ['jon', 'patterns', 'javscript', 'artst'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Five books, two keys. Try an author, a title, or either one misspelled.' });
  const box = searchBox(stage.root, stage, { value: stage.preview ? '' : 'jon', placeholder: 'Search the books…', tries: QUERIES });
  const call = callLine(stage.root);
  const list = resultList(stage.root, { max: stage.preview ? 3 : 5 });

  // The Quick Start in two lines: the list, and the keys to look in.
  const fuse = new Fuse(books, { keys: ['title', 'author'], includeScore: true, includeMatches: true });

  const run = (query: string): void => {
    call.set(`fuse.search(${q(query)})`);
    if (!query.trim()) {
      list.show([], `Type to search ${books.length} books`);
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
    stage.say(
      results.length ? `${results.length} of ${books.length} books match, best first. A score of 0 is a perfect match` : `No book is close to "${query}"`,
      results.length ? 'ok' : 'warn',
    );
  };
  box.onInput(run);
  run(box.value);
  typeLoop(stage, box, QUERIES.slice(0, 3));
  return stage.dispose;
};

export default mount;
