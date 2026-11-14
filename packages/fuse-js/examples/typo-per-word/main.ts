// Each misspelt query word finds its own word in the title, shown in its own colour
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { resultList } from '../../shared/results.ts';
import { searchBox, typeLoop } from '../../shared/search-box.ts';
import { createStage } from '../../shared/stage.ts';
import { matchedWords, paintWords, wordDots, wordHits, wordRow, wordsOf } from '../../shared/token-marks.ts';

// Page titles from the docs of an imaginary web framework.
const TITLES = [
  'Express routing guide', 'Writing middleware for Express', 'Using Express middleware', 'Routing with middleware in Express',
  'Error handling in Express', 'Template engines for Express', 'Serving static files', 'Database integration',
  'Production best practices: security', 'Behind proxies', 'Route parameters and queries', 'Writing a custom router',
  'Debugging Express', 'Migrating to Express 5', 'Middleware for error handling',
].map((title) => ({ title }));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each colour is one query word, matched on its own even though it is misspelt.' });
  const box = searchBox(stage.root, stage, { value: 'express midleware rout', placeholder: 'Search the docs…', tries: ['express midleware rout', 'eror handlin express', 'static fils', 'templte engins'] });
  const words = wordRow(stage.root);
  const list = resultList(stage.root, { max: stage.preview ? 3 : 6, ranks: false, scores: !stage.preview });

  const fuse = new Fuse(TITLES, { keys: ['title'], useTokenSearch: true, threshold: 0.4, minMatchCharLength: 2, includeScore: true, includeMatches: true });

  const run = (query: string): void => {
    const terms = wordsOf(query);
    words.set(terms);
    if (!terms.length) {
      list.show([], 'Type a few words');
      stage.say('');
      return;
    }
    const results = fuse.search(query);
    // One extra search per word tells which word matched which title.
    const hits = wordHits(fuse, terms);
    list.show(
      results.map((r) => ({
        id: r.refIndex,
        title: paintWords(hits, r.refIndex, 'title', r.item.title),
        sub: stage.preview ? undefined : wordDots(hits, r.refIndex),
        badge: stage.preview ? `${matchedWords(hits, r.refIndex).filter(Boolean).length}/${terms.length}` : undefined,
        score: r.score,
      })),
      'No title has any of these words',
    );
    const top = results[0];
    const n = top ? matchedWords(hits, top.refIndex).filter(Boolean).length : 0;
    stage.say(top ? `Best title matches ${n} of ${terms.length} words, typos and all` : 'Nothing close enough', top ? 'ok' : 'warn');
  };
  box.onInput(run);
  run(box.value);
  typeLoop(stage, box, ['express midleware rout', 'eror handlin express']);
  return stage.dispose;
};

export default mount;
