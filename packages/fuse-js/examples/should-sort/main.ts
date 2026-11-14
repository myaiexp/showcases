// shouldSort on and off: best-first ranking next to the original list order
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { BOOKS } from '../../shared/data.ts';
import { marked } from '../../shared/highlight.ts';
import { resultList } from '../../shared/results.ts';
import { searchBox, typeLoop } from '../../shared/search-box.ts';
import { createStage } from '../../shared/stage.ts';
import { codeHeads } from '../../shared/code-heads.ts';
import { columns } from '../../shared/widgets.ts';

const QUERIES = ['man', 'ur', 'jon'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Both columns hold the same matches with the same scores. Only the order differs.' });
  const box = searchBox(stage.root, stage, { value: stage.preview ? '' : 'man', placeholder: 'Search books…', tries: QUERIES });
  const cols = columns(stage, ['shouldSort: true (default)', 'shouldSort: false']);
  codeHeads(cols);
  const [ranked, listed] = cols;
  const max = stage.preview ? 4 : 8;
  const rankedList = resultList(ranked!.body, { max, ranks: false });
  const listedList = resultList(listed!.body, { max, ranks: false });

  const keys = ['title', 'author'];
  const byScore = new Fuse(BOOKS, { keys, includeScore: true, includeMatches: true });
  // Switching sorting off keeps the results in the order of the original list.
  const inOrder = new Fuse(BOOKS, { keys, includeScore: true, includeMatches: true, shouldSort: false });

  const row = (r: ReturnType<typeof byScore.search>[number]) => ({ id: r.refIndex, title: marked(r, 'title', r.item.title), sub: marked(r, 'author', r.item.author), score: r.score });

  const run = (query: string): void => {
    if (!query.trim()) {
      rankedList.show([], 'Type to search');
      listedList.show([], 'Type to search');
      stage.say('');
      return;
    }
    const a = byScore.search(query);
    const b = inOrder.search(query);
    rankedList.show(a.map(row));
    listedList.show(b.map(row));
    const same = a.every((r, i) => r.refIndex === b[i]?.refIndex);
    stage.say(
      a.length ? `${a.length} matches either way. ${same ? 'Here the two orders happen to agree' : 'The left column is best first; the right keeps the shelf order'}` : `Nothing matches "${query}"`,
      a.length ? 'ok' : 'warn',
    );
  };
  box.onInput(run);
  run(box.value);
  typeLoop(stage, box, QUERIES.slice(0, 2));
  return stage.dispose;
};

export default mount;
