// An advanced-search form: each filled-in field becomes a clause of a logical query
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { select, textInput } from '../../shared/controls.ts';
import { field, marked } from '../../shared/highlight.ts';
import { SHELF_BOOKS } from '../../shared/logical-data.ts';
import { queryText } from '../../shared/logical-view.ts';
import { resultList } from '../../shared/results.ts';
import { createStage } from '../../shared/stage.ts';

type Form = { author: string; genre: string; year: string; mode: '$and' | '$or' };

const SETS: Form[] = [
  { author: 'scalzi', genre: '', year: '', mode: '$and' },
  { author: 'scalzi', genre: '', year: '^201', mode: '$and' },
  { author: 'scalzi', genre: 'fantasy', year: '', mode: '$and' },
  { author: 'scalzi', genre: 'fantasy', year: '', mode: '$or' },
  { author: '', genre: 'science', year: '!19', mode: '$and' },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Year is searched as text: "^201" means starts with 201. Leave a field empty to ignore it.' });
  const code = queryText(stage.root, stage);
  const list = resultList(stage.root, { max: stage.preview ? 3 : 8, scores: false, ranks: false });

  const fuse = new Fuse(SHELF_BOOKS, { keys: ['title', 'author', 'genre', 'year'], useExtendedSearch: true, includeMatches: true, threshold: 0.3 });
  const form: Form = { ...SETS[0]! };

  const run = (): void => {
    // Only the filled-in fields become clauses; the toggle picks $and or $or.
    const clauses = (['author', 'genre', 'year'] as const).filter((k) => form[k].trim()).map((k) => ({ [k]: form[k].trim() }));
    if (!clauses.length) {
      code.set({ [form.mode]: [] });
      list.show([], 'Fill in a field to start');
      stage.say('No field filled in yet: nothing to search for');
      return;
    }
    const query = { [form.mode]: clauses };
    code.set(query);
    const results = fuse.search(query);
    list.show(
      results.map((r) => ({
        id: r.refIndex,
        title: marked(r, 'title', r.item.title),
        sub: [
          field('', marked(r, 'author', r.item.author)),
          document.createTextNode(' · '),
          field('', marked(r, 'genre', r.item.genre)),
          document.createTextNode(' · '),
          field('', marked(r, 'year', r.item.year)),
        ],
      })),
      'No book fits the form',
    );
    stage.say(
      stage.preview ? `${results.length} of ${SHELF_BOOKS.length} books` : `${clauses.length} filled field${clauses.length > 1 ? 's' : ''}, ${form.mode === '$and' ? 'all must fit' : 'any may fit'}: ${results.length} of ${SHELF_BOOKS.length} books`,
      results.length ? 'ok' : 'warn',
    );
  };

  if (stage.preview) {
    stage.cycle(SETS, 2400, (set) => {
      Object.assign(form, set);
      run();
    });
  } else if (stage.bar) {
    textInput(stage.bar, 'author', form.author, (v) => ((form.author = v), run()), 10);
    textInput(stage.bar, 'genre', form.genre, (v) => ((form.genre = v), run()), 10);
    textInput(stage.bar, 'year', form.year, (v) => ((form.year = v), run()), 6);
    select(stage.bar, 'a book must fit', [['$and', 'all fields'], ['$or', 'any field']] as const, (m) => ((form.mode = m), run()), form.mode);
    run();
  }
  return stage.dispose;
};

export default mount;
