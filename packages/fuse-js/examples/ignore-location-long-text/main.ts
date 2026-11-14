// Shop descriptions searched twice: the default window, and ignoreLocation
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { PRODUCTS } from '../../shared/data.ts';
import { marked } from '../../shared/highlight.ts';
import { resultList } from '../../shared/results.ts';
import { searchBox, typeLoop } from '../../shared/search-box.ts';
import { createStage } from '../../shared/stage.ts';
import { columns } from '../../shared/widgets.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The @number is where the match starts in the description. Past about 30 letters the default search gives up.' });
  const box = searchBox(stage.root, stage, { value: stage.preview ? '' : 'battery', placeholder: 'A word from a description…', tries: ['battery', 'gloves', 'tank', 'shower', 'flights'] });
  const [plain, anywhere] = columns(stage, ['Default location', 'ignoreLocation: true']);
  const max = stage.preview ? 3 : 5;
  const left = resultList(plain!.body, { max, ranks: false, scores: false, empty: 'Not found' });
  const right = resultList(anywhere!.body, { max, ranks: false, scores: false, empty: 'Not found' });

  // Both use threshold 0.3 and the default distance of 100, so the default search only
  // reads the first 30 characters (threshold × distance). The second one reads it all.
  const base = { keys: ['description'], threshold: 0.3, includeMatches: true };
  const defaults = new Fuse(PRODUCTS, base);
  const anyPlace = new Fuse(PRODUCTS, { ...base, ignoreLocation: true });

  const rows = (results: ReturnType<typeof defaults.search>) =>
    results.map((r) => ({
      id: r.refIndex,
      title: r.item.name,
      sub: stage.preview ? undefined : marked(r, 'description', r.item.description),
      badge: `@${r.matches?.[0]?.indices[0]?.[0] ?? '?'}`,
    }));

  const run = (query: string): void => {
    if (!query.trim()) {
      left.show([], 'Type a word');
      right.show([], 'Type a word');
      stage.say('');
      return;
    }
    const a = defaults.search(query);
    const b = anyPlace.search(query);
    left.show(rows(a));
    right.show(rows(b));
    stage.say(`"${query}": ${a.length} found by default, ${b.length} with ignoreLocation`, b.length > a.length ? 'ok' : 'info');
  };
  box.onInput(run);
  run(box.value);
  typeLoop(stage, box, ['battery', 'gloves', 'tank']);
  return stage.dispose;
};

export default mount;
