// The same typo-filled query run as one pattern and as separate words
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { marked } from '../../shared/highlight.ts';
import { resultList } from '../../shared/results.ts';
import { searchBox, typeLoop } from '../../shared/search-box.ts';
import { createStage } from '../../shared/stage.ts';
import { columns } from '../../shared/widgets.ts';

const BOOKS = [
  'JavaScript Patterns', 'JavaScript: The Good Parts', 'Design Patterns in Python', 'Patterns of Enterprise Application Architecture',
  'Learning React', 'Eloquent JavaScript', 'Clean Code', 'The Pragmatic Programmer', 'Refactoring Databases', 'Python Crash Course',
  'CSS Secrets', 'Node.js Design Patterns', 'Head First Design Patterns', 'Learning Python',
].map((title) => ({ title }));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Misspell two words on purpose. Fuse.js treats a plain query as one long pattern; token search takes the words one by one.' });
  const box = searchBox(stage.root, stage, { value: 'python desing paterns', placeholder: 'Find a book…', tries: ['python desing paterns', 'javascrpt paterns', 'paterns desing node', 'lerning pyton'] });
  const [plain, token] = columns(stage, ['Query as one pattern', 'Token search']);
  const max = stage.preview ? 3 : 6;
  const plainList = resultList(plain!.body, { max, ranks: false, scores: !stage.preview, empty: 'Nothing found' });
  const tokenList = resultList(token!.body, { max, ranks: false, scores: !stage.preview, empty: 'Nothing found' });

  // The only difference between the two instances is useTokenSearch.
  const base = { keys: ['title'], threshold: 0.4, minMatchCharLength: 2, includeScore: true, includeMatches: true };
  const plainFuse = new Fuse(BOOKS, base);
  const tokenFuse = new Fuse(BOOKS, { ...base, useTokenSearch: true });

  const show = (fuse: Fuse<{ title: string }>, list: typeof plainList, query: string): number => {
    const results = fuse.search(query);
    list.show(results.map((r) => ({ id: r.refIndex, title: marked(r, 'title', r.item.title), score: r.score })));
    return results.length;
  };

  const run = (query: string): void => {
    if (!query.trim()) {
      plainList.show([], 'Type a query');
      tokenList.show([], 'Type a query');
      stage.say('');
      return;
    }
    const a = show(plainFuse, plainList, query);
    const b = show(tokenFuse, tokenList, query);
    stage.say(
      a === 0 ? `One pattern finds nothing; token search finds ${b} books` : `One pattern finds ${a}; token search finds ${b}, counting each word on its own`,
      a === 0 && b > 0 ? 'ok' : 'info',
    );
  };
  box.onInput(run);
  run(box.value);
  typeLoop(stage, box, ['python desing paterns', 'paterns desing node', 'javascrpt paterns']);
  return stage.dispose;
};

export default mount;
