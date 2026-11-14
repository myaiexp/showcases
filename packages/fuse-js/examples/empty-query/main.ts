// An empty search returns every item, unranked and without scores
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { PEOPLE } from '../../shared/data.ts';
import { marked } from '../../shared/highlight.ts';
import { searchBox, typeLoop } from '../../shared/search-box.ts';
import { shelf, type Hit } from '../../shared/shelf.ts';
import { createStage } from '../../shared/stage.ts';
import { callLine, pills, q } from '../../shared/widgets.ts';

const QUERIES = ['jo', 'saar', 'north'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Clear the box: the whole list comes back.' });
  const box = searchBox(stage.root, stage, { placeholder: 'Find a contact…', tries: QUERIES });
  const call = callLine(stage.root);
  const info = pills(stage.root);
  const people = shelf(stage.root, PEOPLE.map((p, id) => ({ id, label: p.name })));

  const fuse = new Fuse(PEOPLE, { keys: ['name', 'company'], includeScore: true, includeMatches: true });

  const run = (query: string): void => {
    call.set(`fuse.search(${q(query)})`);
    // With nothing typed, search() hands back every item in its original order,
    // with no score and no matches. That makes a search box simple to build: no special case.
    const results = fuse.search(query);
    const empty = !query.trim();
    const hits = new Map<number, Hit>();
    results.forEach((r, i) => hits.set(r.refIndex, { score: r.score, nodes: marked(r, 'name', r.item.name), rank: empty ? undefined : i + 1 }));
    people.mark(hits);
    info.set('results', results.length, empty ? 'ok' : undefined);
    info.set('with a score', results.filter((r) => r.score !== undefined).length, empty ? 'warn' : 'ok');
    stage.say(
      empty ? `Empty query: all ${PEOPLE.length} contacts come back, in list order, with no scores` : `${results.length} of ${PEOPLE.length} contacts match "${query}"`,
      empty ? 'info' : results.length ? 'ok' : 'warn',
    );
  };
  box.onInput(run);
  run(box.value);
  typeLoop(stage, box, QUERIES, 1400);
  return stage.dispose;
};

export default mount;
