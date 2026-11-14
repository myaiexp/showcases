// The same query drawn twice: every match, and the top 20 from { limit: 20 }
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { people } from '../../shared/big-data.ts';
import { marked } from '../../shared/highlight.ts';
import { resultList } from '../../shared/results.ts';
import { searchBox, typeLoop } from '../../shared/search-box.ts';
import { createStage } from '../../shared/stage.ts';
import { columns, pills } from '../../shared/widgets.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Short queries match the most people. Compare the drawing times.' });
  const box = searchBox(stage.root, stage, { value: 'ana', tries: ['ana', 'chef', 'e', 'nora tanaka'] });
  const [all, top] = columns(stage, ['Every match', '{ limit: 20 }']);
  const allInfo = pills(all!.body);
  const topInfo = pills(top!.body);
  // A card never draws thousands of rows; it only counts them.
  const allList = stage.preview ? null : resultList(all!.body, { scores: false });
  const topList = resultList(top!.body, { max: stage.preview ? 3 : 20, scores: false });

  const docs = people(stage.preview ? 3000 : 20000, 5);
  const fuse = new Fuse(docs, { keys: ['name', 'description'], threshold: 0.4, includeMatches: true });
  const rows = (rs: ReturnType<typeof fuse.search>) => rs.map((r) => ({ id: r.refIndex, title: marked(r, 'name', r.item.name), sub: r.item.description }));

  const run = (query: string): void => {
    if (!query.trim()) return;
    let t0 = performance.now();
    const every = fuse.search(query);
    allInfo.set('matches', every.length.toLocaleString('en'));
    allInfo.set('ms search', Math.round(performance.now() - t0));
    if (allList) {
      t0 = performance.now();
      allList.show(rows(every));
      allInfo.set('ms drawing', Math.round(performance.now() - t0), 'bad');
    }
    t0 = performance.now();
    // limit keeps only the best N, so there are only N rows to draw.
    const best = fuse.search(query, { limit: 20 });
    topInfo.set('matches', best.length);
    topInfo.set('ms search', Math.round(performance.now() - t0));
    t0 = performance.now();
    topList.show(rows(best));
    topInfo.set('ms drawing', Math.round(performance.now() - t0), 'ok');
    stage.say(`"${query}" matches ${every.length.toLocaleString('en')} of ${docs.length.toLocaleString('en')} people; the top 20 are the same either way`, 'ok');
  };
  box.onInput(run);
  run(box.value);
  typeLoop(stage, box, ['ana', 'chef', 'nora']);
  return stage.dispose;
};

export default mount;
