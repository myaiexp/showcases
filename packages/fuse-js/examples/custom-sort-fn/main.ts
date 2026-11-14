// A custom sortFn breaks score ties by newest year instead of shelf order
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { BOOKS } from '../../shared/data.ts';
import { resultList } from '../../shared/results.ts';
import { searchBox } from '../../shared/search-box.ts';
import { createStage } from '../../shared/stage.ts';
import { codeHeads } from '../../shared/code-heads.ts';
import { columns } from '../../shared/widgets.ts';

const QUERIES = ['classic', 'science fiction', 'fantasy'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Searching genres gives many perfect scores: the order among them is up to sortFn.' });
  const box = searchBox(stage.root, stage, { value: 'classic', placeholder: 'Search by genre…', tries: QUERIES });
  const cols = columns(stage, ['Default sort', 'sortFn: score, then newest']);
  codeHeads(cols);
  const [plain, custom] = cols;
  const max = stage.preview ? 4 : 6;
  const plainList = resultList(plain!.body, { max, ranks: false, scores: false });
  const customList = resultList(custom!.body, { max, ranks: false, scores: false });

  const keys = ['genre'];
  const normal = new Fuse(BOOKS, { keys, includeScore: true });
  // sortFn compares two results: a negative number puts `a` first. `idx` is the book's
  // place in the original list, which is how the year is looked up.
  const newestFirst = new Fuse(BOOKS, {
    keys,
    includeScore: true,
    sortFn: (a, b) => a.score - b.score || BOOKS[b.idx]!.year - BOOKS[a.idx]!.year,
  });

  const row = (r: { refIndex: number; item: (typeof BOOKS)[number] }) => ({ id: r.refIndex, title: r.item.title, badge: String(r.item.year) });

  const run = (query: string): void => {
    if (!query.trim()) {
      plainList.show([], 'Type a genre');
      customList.show([], 'Type a genre');
      stage.say('');
      return;
    }
    const a = normal.search(query);
    const b = newestFirst.search(query);
    plainList.show(a.map(row));
    customList.show(b.map(row));
    stage.say(
      !a.length
        ? `No genre is close to "${query}"`
        : new Set(a.map((r) => r.score)).size === 1
          ? `${a.length} books tie on score. By default they keep shelf order; with the custom sortFn the newest comes first`
          : `${a.length} books found; wherever scores tie, the custom sortFn puts the newest first`,
      a.length ? 'ok' : 'warn',
    );
  };
  box.onInput(run);
  run(box.value);
  if (stage.preview) {
    const steps = QUERIES;
    stage.cycle(steps, 2400, (s) => box.set(s));
  }
  return stage.dispose;
};

export default mount;
