// fuse.setCollection(): the same Fuse searches a different list after a swap
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { docShelf } from '../../shared/doc-shelf.ts';
import { searchBox } from '../../shared/search-box.ts';
import { createStage } from '../../shared/stage.ts';
import { pills } from '../../shared/widgets.ts';

interface Book {
  title: string;
}
const books = (...titles: string[]): Book[] => titles.map((title) => ({ title }));

const LIBRARIES: { name: string; books: Book[] }[] = [
  { name: 'City library', books: books('War and Peace', "Old Man's War", 'The Art of War', 'Dune', 'Emma', 'Persuasion', 'Ulysses', 'Beloved') },
  { name: 'School library', books: books('Warriors: Into the Wild', 'Matilda', 'Holes', 'The Giver', 'Hatchet', 'Wonder', 'Coraline', 'Stargirl') },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Both libraries are searched by one Fuse object. Change the query, then swap the list.' });
  const box = searchBox(stage.root, stage, { value: 'war', placeholder: 'Search the library…', tries: ['war', 'dune', 'matilda', 'wonder'] });
  const info = pills(stage.root);
  const shelf = docShelf<Book>(stage.root, { label: (b) => b.title });

  // One instance for the whole example: it is never replaced, only given a new list.
  const fuse = new Fuse(LIBRARIES[0]!.books, { keys: ['title'], includeScore: true });
  let swaps = 0;
  let current = 0;

  const run = (): void => {
    const q = box.value.trim();
    const results = q ? fuse.search(q) : [];
    shelf.mark(q ? new Map(results.map((r) => [r.item, r.score] as const)) : null);
    if (!stage.preview) info.set('matches', results.length, results.length ? 'ok' : undefined);
  };
  const show = (n: number): void => {
    current = n;
    const lib = LIBRARIES[n]!;
    // Swaps the whole list and rebuilds the index; the Fuse object, options and query stay.
    fuse.setCollection(lib.books);
    swaps++;
    shelf.sync(lib.books);
    info.set('shelf', lib.name);
    info.set('setCollection calls', swaps);
    run();
    stage.say(`${lib.name}: ${box.value.trim() ? fuse.search(box.value).length : 0} of ${lib.books.length} books match "${box.value}"`, 'ok');
  };
  box.onInput(run);
  show(0);

  if (stage.preview) {
    stage.every(2600, () => show((current + 1) % LIBRARIES.length));
  } else if (stage.bar) {
    button(stage.bar, 'City library', () => show(0));
    button(stage.bar, 'School library', () => show(1));
  }
  return stage.dispose;
};

export default mount;
