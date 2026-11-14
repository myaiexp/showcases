// City names with accents, searched without typing them, with and without ignoreDiacritics
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { CITIES } from '../../shared/data.ts';
import { marked } from '../../shared/highlight.ts';
import { resultList } from '../../shared/results.ts';
import { searchBox, typeLoop } from '../../shared/search-box.ts';
import { createStage } from '../../shared/stage.ts';
import { columns } from '../../shared/widgets.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'A score of 0.00 is a perfect match. Lower the threshold and the left column loses its cities.' });
  const box = searchBox(stage.root, stage, { value: stage.preview ? '' : 'malmo', tries: ['malmo', 'sao paulo', 'zurich', 'krakow', 'lodz', 'goteborg'] });
  const [plain, folded] = columns(stage, ['Default', 'ignoreDiacritics: true']);
  const left = resultList(plain!.body, { max: 3, ranks: false, scores: !stage.preview, empty: 'No matches' });
  const right = resultList(folded!.body, { max: 3, ranks: false, scores: !stage.preview, empty: 'No matches' });
  let threshold = 0.3;

  const run = (): void => {
    const query = box.value;
    if (!query.trim()) {
      left.show([], 'Type a city');
      right.show([], 'Type a city');
      stage.say('');
      return;
    }
    const options = { threshold, includeScore: true, includeMatches: true };
    // The only difference between the two searches is the ignoreDiacritics flag.
    const a = new Fuse(CITIES, options).search(query);
    const b = new Fuse(CITIES, { ...options, ignoreDiacritics: true }).search(query);
    const toRows = (rs: typeof a) => rs.map((r) => ({ id: r.refIndex, title: marked(r, undefined, r.item), score: r.score }));
    left.show(toRows(a));
    right.show(toRows(b));
    const wanted = b[0];
    const same = wanted && a.find((r) => r.item === wanted.item);
    if (wanted && !same) stage.say(`Without ignoreDiacritics, "${query}" does not find ${wanted.item}`, 'bad');
    else if (wanted && same) stage.say(`Both find ${wanted.item}, but the missing accent costs a score of ${same.score?.toFixed(2)} instead of ${wanted.score?.toFixed(2)}`, 'ok');
    else stage.say(`"${query}" matches no city at threshold ${threshold.toFixed(2)}`, 'warn');
  };

  box.onInput(run);
  run();
  typeLoop(stage, box, ['malmo', 'lodz', 'zurich', 'sao paulo']);
  if (stage.bar) slider(stage.bar, 'threshold', 0, 0.6, 0.05, threshold, (v) => ((threshold = v), run()), (v) => v.toFixed(2));
  return stage.dispose;
};

export default mount;
