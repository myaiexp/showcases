// "=word" keeps only items that are exactly that word, next to a plain fuzzy search
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { reading } from '../../shared/ext-reading.ts';
import { lightUp } from '../../shared/ext-shelf.ts';
import { searchBox, typeLoop } from '../../shared/search-box.ts';
import { shelf } from '../../shared/shelf.ts';
import { createStage } from '../../shared/stage.ts';
import { columns } from '../../shared/widgets.ts';

const NAMES = ['Scheme', 'Scheme language', 'Schemes', 'Schema', 'Scheduler', 'Chemistry', 'Scheme guide', 'Haskell'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Type one word. Capital letters never matter, but every other letter has to be there.' });
  const box = searchBox(stage.root, stage, { placeholder: 'Type one word…', value: 'scheme', tries: ['scheme', 'schema', 'haskell', 'hask'] });
  const [loose, strict] = columns(stage, ['Fuzzy', 'Exact: ='], stage.root);
  const looseTiles = shelf(loose!.body, NAMES.map((label, id) => ({ id, label })), { scores: false });
  const strictTiles = shelf(strict!.body, NAMES.map((label, id) => ({ id, label })), { scores: false });
  const read = reading(stage.root, !stage.preview);

  // The same list searched twice: the word as typed, and the word behind "=".
  const fuse = new Fuse(NAMES, { useExtendedSearch: true });

  const run = (word: string): void => {
    const w = word.trim();
    if (!w || /\s/.test(w)) {
      lightUp(looseTiles, null);
      lightUp(strictTiles, null);
      read.set('');
      stage.say('');
      return;
    }
    const fuzzy = fuse.search(w);
    const exact = fuse.search(`=${w}`);
    lightUp(looseTiles, fuzzy);
    lightUp(strictTiles, exact);
    loose!.head.textContent = `Fuzzy: ${w}`;
    strict!.head.textContent = `Exact: =${w}`;
    read.set(`=${w}`);
    if (stage.preview) stage.say(`Fuzzy keeps ${fuzzy.length}, exact keeps ${exact.length}`, exact.length ? 'ok' : 'warn');
    else stage.say(
      exact.length
        ? `"${w}" alone keeps ${fuzzy.length} of ${NAMES.length}; "=${w}" keeps only ${exact.length}`
        : `"=${w}" keeps nothing: no item is exactly "${w}", though fuzzy finds ${fuzzy.length}`,
      exact.length ? 'ok' : 'warn',
    );
  };
  box.onInput(run);
  run(box.value);
  typeLoop(stage, box, ['scheme', 'schema', 'hask', 'haskell']);
  return stage.dispose;
};

export default mount;
