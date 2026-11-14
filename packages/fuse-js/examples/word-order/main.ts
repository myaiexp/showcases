// Swap the words of a query: token search keeps the ranking, plain fuzzy changes it
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { marked } from '../../shared/highlight.ts';
import { resultList } from '../../shared/results.ts';
import { searchBox } from '../../shared/search-box.ts';
import { createStage } from '../../shared/stage.ts';
import { columns, pills } from '../../shared/widgets.ts';

const BOOKS = [
  'JavaScript Patterns', 'JavaScript: The Good Parts', 'Design Patterns in Python', 'Patterns of Enterprise Application Architecture',
  'Learning React', 'Eloquent JavaScript', 'Clean Code', 'Refactoring Databases', 'Python Crash Course',
  'Node.js Design Patterns', 'Head First Design Patterns', 'Learning Python',
].map((title) => ({ title }));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Press "Swap the words" and watch the left column stay put while the right one reshuffles.' });
  const box = searchBox(stage.root, stage, { value: 'javascript patterns', tries: ['javascript patterns', 'design patterns python', 'learning python'] });
  const [token, plain] = columns(stage, ['Token search', 'Plain fuzzy']);
  const max = stage.preview ? 3 : 5;
  const tokenList = resultList(token!.body, { max, ranks: true, scores: !stage.preview });
  const plainList = resultList(plain!.body, { max, ranks: true, scores: !stage.preview });
  const info = pills(stage.root);

  const base = { keys: ['title'], threshold: 0.4, minMatchCharLength: 2, includeScore: true, includeMatches: true };
  const tokenFuse = new Fuse(BOOKS, { ...base, useTokenSearch: true });
  const plainFuse = new Fuse(BOOKS, base);

  const order = (fuse: Fuse<{ title: string }>, query: string): string => fuse.search(query).map((r) => r.refIndex).join();
  const swapped = (query: string): string => query.trim().split(/\s+/).reverse().join(' ');

  const run = (query: string): void => {
    for (const [fuse, list] of [[tokenFuse, tokenList], [plainFuse, plainList]] as const) {
      list.show(fuse.search(query).map((r) => ({ id: r.refIndex, title: marked(r, 'title', r.item.title), score: r.score })), 'Nothing found');
    }
    // The same two searches again with the words in the other order.
    const other = swapped(query);
    const tokenSame = order(tokenFuse, query) === order(tokenFuse, other);
    const plainSame = order(plainFuse, query) === order(plainFuse, other);
    info.set(`token search: same ranking for '${other}'`, tokenSame ? 'yes' : 'no', tokenSame ? 'ok' : 'bad');
    info.set(`plain fuzzy: same ranking`, plainSame ? 'yes' : 'no', plainSame ? 'ok' : 'bad');
    stage.say(
      query.trim().split(/\s+/).length < 2
        ? 'Type two or more words to see the order stop mattering'
        : tokenSame && !plainSame
          ? `Token search ranks "${query}" and "${other}" the same; plain fuzzy does not`
          : `Both rank "${query}" and "${other}" the same here`,
      'info',
    );
  };
  box.onInput(run);
  run(box.value);

  if (stage.preview) {
    stage.play(async (wait) => {
      await wait(1800);
      box.set('patterns javascript');
      await wait(1800);
      box.set('python design patterns');
      await wait(1800);
      box.set('patterns design python');
      await wait(1800);
      box.set('javascript patterns');
    });
  } else if (stage.bar) {
    button(stage.bar, 'Swap the words', () => box.set(swapped(box.value)));
  }
  return stage.dispose;
};

export default mount;
