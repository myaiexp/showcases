// "!word" over title and author: a book goes if the word is in either one
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { reading } from '../../shared/ext-reading.ts';
import { searchBox, typeLoop } from '../../shared/search-box.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';
import { verdictTable } from './table.ts';

const BOOKS = [
  { title: "Old Man's War", author: 'Scalzi' },
  { title: 'Scalzi on Writing', author: 'Lee' },
  { title: 'The War of the Worlds', author: 'Wells' },
  { title: 'Dune', author: 'Herbert' },
  { title: 'Artist for Life', author: 'Michelangelo' },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hide a word that sits in an author name. Looking only at the title leaves that book in.' });
  const box = searchBox(stage.root, stage, { placeholder: 'Hide…', value: '!scalzi', tries: ['!scalzi', '!war', '!artist', '!war !scalzi', '^old !zzz'] });
  const table = verdictTable(stage.root, BOOKS, ['Title only', 'Title + author'], stage.preview);
  const read = stage.preview ? null : reading(stage.root);

  // The same query on two instances: only the keys differ.
  const titleOnly = new Fuse(BOOKS, { useExtendedSearch: true, keys: ['title'] });
  const both = new Fuse(BOOKS, { useExtendedSearch: true, keys: ['title', 'author'] });

  const run = (query: string): void => {
    read?.set(query);
    if (!query.trim()) {
      table.show([null, null]);
      stage.say('Type "!" and a word');
      return;
    }
    const a = titleOnly.search(query);
    const b = both.search(query);
    const stays = (found: typeof a): boolean[] => BOOKS.map((_, i) => found.some((r) => r.refIndex === i));
    table.show([stays(a), stays(b)]);
    const dropped = a.length - b.length;
    stage.say(
      b.length === 0 && a.length > 0
        ? stage.preview ? '"!" mixed with a word: nothing stays' : 'Mixing "!" with a plain word over two keys keeps nothing here: every key has to match'
        : dropped > 0
          ? stage.preview ? `Author checked: ${dropped} more hidden` : `Looking in the author too hides ${dropped} more book${dropped > 1 ? 's' : ''}: the word was in the author`
          : `Both agree: ${b.length} of ${BOOKS.length} books stay`,
      'info',
    );
  };
  box.onInput(run);
  run(box.value);
  typeLoop(stage, box, ['!scalzi', '!war', '^old !zzz']);
  return stage.dispose;
};

export default mount;
