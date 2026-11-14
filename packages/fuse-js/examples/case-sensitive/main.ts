// Capitals matter or not: one list, one query, two Fuse instances
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { marked } from '../../shared/highlight.ts';
import { resultList } from '../../shared/results.ts';
import { searchBox, typeLoop } from '../../shared/search-box.ts';
import { createStage } from '../../shared/stage.ts';
import { columns } from '../../shared/widgets.ts';

const LINES = [
  'US Army veteran',
  'Tell us about it',
  'Bus stop schedule',
  'March 5 meeting',
  'Walk the march route',
  'Apple Store opening',
  'Bake a green apple pie',
  'Polish folk music',
  'Boots need polish',
  'A trip to Turkey',
  'Bring a turkey sandwich',
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Matched letters are marked. Try a query in capitals, then the same one in lower case.' });
  const box = searchBox(stage.root, stage, { value: stage.preview ? '' : 'US', tries: ['US', 'us', 'March', 'march', 'Polish', 'polish', 'Apple'] });
  const [loose, strict] = columns(stage, ['Default: capitals ignored', 'isCaseSensitive: true']);
  const max = stage.preview ? 4 : 8;
  const left = resultList(loose!.body, { max, ranks: false, scores: false, empty: 'No matches' });
  const right = resultList(strict!.body, { max, ranks: false, scores: false, empty: 'No matches' });

  // A tight threshold keeps the fuzziness from forgiving a wrong capital on its own.
  const options = { threshold: 0.1, ignoreLocation: true, includeMatches: true };
  const insensitive = new Fuse(LINES, options);
  const sensitive = new Fuse(LINES, { ...options, isCaseSensitive: true });

  const run = (query: string): void => {
    if (!query.trim()) {
      left.show([], 'Type a word');
      right.show([], 'Type a word');
      stage.say('');
      return;
    }
    const a = insensitive.search(query);
    const b = sensitive.search(query);
    const toRows = (rs: typeof a) => rs.map((r) => ({ id: r.refIndex, title: marked(r, undefined, r.item) }));
    left.show(toRows(a));
    right.show(toRows(b));
    stage.say(`"${query}": ${a.length} lines when capitals are ignored, ${b.length} when they count`, b.length < a.length ? 'ok' : 'info');
  };
  box.onInput(run);
  run(box.value);
  typeLoop(stage, box, ['US', 'March', 'Polish', 'march']);
  return stage.dispose;
};

export default mount;
