// Plain words inside $and / $or: each word is looked for in every field of a book
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { textInput } from '../../shared/controls.ts';
import { SHELF_BOOKS } from '../../shared/logical-data.ts';
import { queryText } from '../../shared/logical-view.ts';
import { resultList } from '../../shared/results.ts';
import { createStage } from '../../shared/stage.ts';

const TRIES: [string, string][] = [['scalzi', 'blue'], ['scalzi', 'red'], ['fantasy', 'blue'], ['scalzi', '2012'], ['old', 'green']];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'No key is named: each word may be found in the title, author, genre, year or colour.' });
  const code = queryText(stage.root, stage);
  const list = resultList(stage.root, { max: stage.preview ? 3 : 8, scores: false });

  const fuse = new Fuse(SHELF_BOOKS, { keys: ['title', 'author', 'genre', 'year', 'color'], includeMatches: true, includeScore: true, threshold: 0.3 });
  let words = [...TRIES[0]!];

  const run = (): void => {
    const active = words.filter((w) => w.trim());
    if (!active.length) {
      code.set({ $and: [] });
      list.show([], 'Type two words');
      return;
    }
    // The array holds bare strings, not { key: 'text' } objects.
    const query = { $and: active };
    code.set(query);
    const results = fuse.search(query);
    list.show(
      results.map((r) => {
        // The keys that matched, from the result's matches.
        const keys = [...new Set((r.matches ?? []).map((m) => m.key))];
        return { id: r.refIndex, title: r.item.title, sub: `found in: ${keys.join(', ')}` };
      }),
      'No book has both words',
    );
    stage.say(
      stage.preview ? `${results.length} of ${SHELF_BOOKS.length} books` : results.length ? `${results.length} of ${SHELF_BOOKS.length} books have every word somewhere, in whatever field` : `No book has ${active.map((w) => `"${w}"`).join(' and ')} anywhere`,
      results.length ? 'ok' : 'warn',
    );
  };

  if (stage.preview) {
    stage.cycle(TRIES, 2400, (t) => {
      words = [...t];
      run();
    });
  } else if (stage.bar) {
    textInput(stage.bar, 'word 1', words[0]!, (v) => ((words[0] = v), run()), 10);
    textInput(stage.bar, 'word 2', words[1]!, (v) => ((words[1] = v), run()), 10);
    run();
  }
  return stage.dispose;
};

export default mount;
