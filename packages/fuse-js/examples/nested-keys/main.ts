// Dot paths reach into nested records: author.name and author.country on each book
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { field, marked } from '../../shared/highlight.ts';
import { resultList } from '../../shared/results.ts';
import { searchBox, typeLoop } from '../../shared/search-box.ts';
import { createStage } from '../../shared/stage.ts';
import { callLine, q } from '../../shared/widgets.ts';

// Each book keeps its author as a little object of its own.
const SHELF = [
  { title: 'Norwegian Wood', author: { name: 'Haruki Murakami', country: 'Japan' } },
  { title: 'Kafka on the Shore', author: { name: 'Haruki Murakami', country: 'Japan' } },
  { title: 'The Left Hand of Darkness', author: { name: 'Ursula K. Le Guin', country: 'United States' } },
  { title: 'One Hundred Years of Solitude', author: { name: 'Gabriel Garcia Marquez', country: 'Colombia' } },
  { title: 'Dune', author: { name: 'Frank Herbert', country: 'United States' } },
  { title: 'The Hobbit', author: { name: 'J.R.R. Tolkien', country: 'England' } },
  { title: 'Moomin Valley in November', author: { name: 'Tove Jansson', country: 'Finland' } },
  { title: 'The Unknown Soldier', author: { name: 'Vaino Linna', country: 'Finland' } },
];

const QUERIES = ['tolkein', 'japan', 'finlnd', 'herbrt'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The titles never mention a country: author.country is searched too.' });
  const box = searchBox(stage.root, stage, { value: stage.preview ? '' : 'tolkein', placeholder: 'Title, author or country…', tries: QUERIES });
  const call = callLine(stage.root, `keys: ['title', 'author.name', 'author.country']`);
  const list = resultList(stage.root, { max: stage.preview ? 3 : 6 });

  // 'author.name' walks into each book's author object.
  const fuse = new Fuse(SHELF, { keys: ['title', 'author.name', 'author.country'], includeScore: true, includeMatches: true, threshold: 0.35 });

  const run = (query: string): void => {
    if (!query.trim()) {
      list.show([], `Type to search ${SHELF.length} books`);
      call.set(`keys: ['title', 'author.name', 'author.country']`);
      stage.say('');
      return;
    }
    const results = fuse.search(query);
    call.set(`fuse.search(${q(query)})`);
    list.show(
      results.map((r) => ({
        id: r.refIndex,
        title: marked(r, 'title', r.item.title),
        sub: [field('', marked(r, 'author.name', r.item.author.name)), document.createTextNode(' · '), field('', marked(r, 'author.country', r.item.author.country))],
        badge: r.matches?.map((m) => m.key).join(', '),
        score: r.score,
      })),
    );
    const where = [...new Set(results[0]?.matches?.map((m) => m.key))].join(' and ');
    stage.say(results[0] ? `${results.length} of ${SHELF.length} books match; the best one matched on ${where}` : `Nothing matches "${query}"`, results.length ? 'ok' : 'warn');
  };
  box.onInput(run);
  run(box.value);
  typeLoop(stage, box, QUERIES.slice(0, 3));
  return stage.dispose;
};

export default mount;
