// Contacts searched two ways: a plain contains-filter and Fuse.js, side by side
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { PEOPLE } from '../../shared/data.ts';
import { highlight, marked } from '../../shared/highlight.ts';
import { resultList } from '../../shared/results.ts';
import { searchBox, typeLoop } from '../../shared/search-box.ts';
import { createStage } from '../../shared/stage.ts';
import { columns } from '../../shared/widgets.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Type a name the way people actually type names.' });
  const box = searchBox(stage.root, stage, { placeholder: 'Find a contact…', tries: ['jonatan', 'mikko virtanan', 'sarah', 'johanson', 'grace hoper'] });
  const [plain, fuzzy] = columns(stage, ['Plain text filter', 'Fuse.js']);
  const max = stage.preview ? 3 : 6;
  const plainList = resultList(plain!.body, { max, scores: false, ranks: false, empty: 'Nothing found' });
  // Cards are too narrow for two columns of score bars, so only the full view draws them.
  const fuzzyList = resultList(fuzzy!.body, { max, ranks: false, scores: !stage.preview });

  // The one line that matters: a Fuse instance over the names, a bit stricter than the
  // default threshold of 0.6, as the docs suggest for search-as-you-type.
  const fuse = new Fuse(PEOPLE, { keys: ['name'], threshold: 0.4, includeScore: true, includeMatches: true });

  const run = (query: string): void => {
    const q = query.trim().toLowerCase();
    if (!q) {
      plainList.show([], 'Type a name');
      fuzzyList.show([], 'Type a name');
      stage.say('');
      return;
    }
    const contains = PEOPLE.flatMap((p, id) => {
      const at = p.name.toLowerCase().indexOf(q);
      return at < 0 ? [] : [{ id, title: highlight(p.name, [[at, at + q.length - 1]]) }];
    });
    plainList.show(contains);
    const results = fuse.search(query);
    fuzzyList.show(results.map((r) => ({ id: r.refIndex, title: marked(r, 'name', r.item.name), score: r.score })));
    stage.say(`Plain filter: ${contains.length} · Fuse.js: ${results.length}`, results.length > contains.length ? 'ok' : 'info');
  };
  box.onInput(run);
  run(box.value);
  typeLoop(stage, box, ['jonatan', 'mikko virtanan', 'johanson']);
  return stage.dispose;
};

export default mount;
