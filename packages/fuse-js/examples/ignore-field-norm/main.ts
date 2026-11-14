// Same recipes, same query, ranked with and without the field-length norm
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { marked } from '../../shared/highlight.ts';
import { RECIPES } from '../../shared/recipes.ts';
import { resultList } from '../../shared/results.ts';
import { searchBox } from '../../shared/search-box.ts';
import { createStage } from '../../shared/stage.ts';
import { columns } from '../../shared/widgets.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Watch "Spaghetti Carbonara": it climbs above the typos once length stops counting.' });
  const box = searchBox(stage.root, stage, { value: stage.preview ? 'carbonera' : 'carbonara', tries: ['carbonara', 'carbonera', 'spaghetti', 'soup'] });
  const [normal, flat] = columns(stage, ['Default', 'ignoreFieldNorm: true']);
  const max = stage.preview ? 7 : 8;
  const left = resultList(normal!.body, { max, scores: !stage.preview, empty: 'No matches' });
  const right = resultList(flat!.body, { max, scores: !stage.preview, empty: 'No matches' });

  const options = { includeScore: true, includeMatches: true };
  const byDefault = new Fuse(RECIPES, options);
  const withoutNorm = new Fuse(RECIPES, { ...options, ignoreFieldNorm: true });

  const run = (query: string): void => {
    if (!query.trim()) {
      left.show([], 'Type a dish');
      right.show([], 'Type a dish');
      stage.say('');
      return;
    }
    const a = byDefault.search(query);
    const b = withoutNorm.search(query);
    const toRows = (rs: typeof a) => rs.map((r) => ({ id: r.refIndex, title: marked(r, undefined, r.item), score: r.score }));
    left.show(toRows(a));
    right.show(toRows(b));
    const moved = b.filter((r, i) => a[i]?.refIndex !== r.refIndex).length;
    stage.say(moved ? `${moved} of ${b.length} results change place when length stops counting` : 'Same order both ways for this query', moved ? 'ok' : 'info');
  };
  box.onInput(run);
  run(box.value);
  if (stage.preview) stage.cycle(['carbonera', 'carbonara', 'carbo'], 3000, (q) => box.set(q));
  return stage.dispose;
};

export default mount;
