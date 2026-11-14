// $path and $val: logical clauses on fields whose names contain a literal dot
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { textInput } from '../../shared/controls.ts';
import { field, marked } from '../../shared/highlight.ts';
import { queryText } from '../../shared/logical-view.ts';
import { resultList } from '../../shared/results.ts';
import { createStage } from '../../shared/stage.ts';

// The author's keys really are called "first.name" and "last.name".
interface Book {
  title: string;
  author: { 'first.name': string; 'last.name': string };
}

const BOOKS: Book[] = [
  ['Old Man\'s War', 'John', 'Scalzi'],
  ['Dune', 'Frank', 'Herbert'],
  ['The Hobbit', 'J.R.R.', 'Tolkien'],
  ['Neuromancer', 'William', 'Gibson'],
  ['Emma', 'Jane', 'Austen'],
  ['Persuasion', 'Jane', 'Austen'],
].map(([title, first, last]) => ({ title: title!, author: { 'first.name': first!, 'last.name': last! } }));

const TRIES: [string, string][] = [['jon', 'scazi'], ['frank', 'herbet'], ['jane', 'ausen'], ['jon', 'herbert']];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Both clauses must match. "jon" alone would also find Jane, so the last name narrows it.' });
  const code = queryText(stage.root, stage);
  const list = resultList(stage.root, { max: 4 });

  // Each key is a list of two names, because "first.name" must not be split at its dot.
  const fuse = new Fuse(BOOKS, {
    keys: ['title', ['author', 'first.name'], ['author', 'last.name']],
    includeMatches: true,
    includeScore: true,
  });
  let [first, last] = TRIES[0]!;

  const run = (): void => {
    // $path says where to look, $val what to look for. Inside $and, both must match.
    const query = {
      $and: [
        { $path: ['author', 'first.name'], $val: first },
        { $path: ['author', 'last.name'], $val: last },
      ],
    };
    code.set(query);
    const results = fuse.search(query);
    list.show(
      results.map((r) => ({
        id: r.refIndex,
        title: r.item.title,
        sub: [
          field('', marked(r, 'author.first.name', r.item.author['first.name'])),
          document.createTextNode(' '),
          field('', marked(r, 'author.last.name', r.item.author['last.name'])),
        ],
        score: r.score,
      })),
      'No author matches both names',
    );
    stage.say(stage.preview ? `${results.length} of ${BOOKS.length} books` : results.length ? `${results.length} of ${BOOKS.length} books have an author matching "${first}" and "${last}"` : `Nobody is both "${first}" and "${last}"`, results.length ? 'ok' : 'warn');
  };

  if (stage.preview) {
    stage.cycle(TRIES, 2200, (t) => {
      [first, last] = t;
      run();
    });
  } else if (stage.bar) {
    textInput(stage.bar, 'first.name', first, (v) => ((first = v), run()), 10);
    textInput(stage.bar, 'last.name', last, (v) => ((last = v), run()), 10);
    run();
  }
  return stage.dispose;
};

export default mount;
