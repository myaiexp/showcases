// "^word" keeps items that start with a word, "!^word" keeps the ones that do not
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { reading } from '../../shared/ext-reading.ts';
import { lightUp } from '../../shared/ext-shelf.ts';
import { highlight } from '../../shared/highlight.ts';
import { searchBox, typeLoop } from '../../shared/search-box.ts';
import { shelf } from '../../shared/shelf.ts';
import { createStage } from '../../shared/stage.ts';
import { columns } from '../../shared/widgets.ts';

const NAMES = ['Java', 'JavaScript', 'The Java Book', 'Erlang', 'Erlang OTP', 'Elixir', 'Go', 'Rust'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Type the first letters of a name. "The Java Book" contains java but does not start with it.' });
  const box = searchBox(stage.root, stage, { placeholder: 'Type the start of a name…', value: 'java', tries: ['java', 'erlang', 'e', 'the', 'lang'] });
  const [starts, notStarts] = columns(stage, ['Starts with: ^', 'Does not: !^'], stage.root);
  const items = NAMES.map((label, id) => ({ id, label }));
  const startTiles = shelf(starts!.body, items, { scores: false });
  const notTiles = shelf(notStarts!.body, items, { scores: false });
  const read = reading(stage.root, !stage.preview);

  // Two searches over the same names: "^" in front of the word, and "!^".
  const fuse = new Fuse(NAMES, { useExtendedSearch: true, includeMatches: true });

  const run = (word: string): void => {
    const w = word.trim().replace(/^!?\^/, '');
    if (!w || /\s/.test(w)) {
      lightUp(startTiles, null);
      lightUp(notTiles, null);
      read.set('');
      stage.say('');
      return;
    }
    const yes = fuse.search(`^${w}`);
    const no = fuse.search(`!^${w}`);
    lightUp(startTiles, yes, { nodes: (r) => highlight(r.item, r.matches?.[0]?.indices) });
    lightUp(notTiles, no);
    starts!.head.textContent = `Starts with: ^${w}`;
    notStarts!.head.textContent = `Does not: !^${w}`;
    read.set(`^${w}`);
    stage.say(stage.preview ? `${yes.length} start with it, ${no.length} do not` : `${yes.length} of ${NAMES.length} names start with "${w}", the other ${no.length} do not`, yes.length ? 'ok' : 'warn');
  };
  box.onInput(run);
  run(box.value);
  typeLoop(stage, box, ['java', 'erlang', 'the']);
  return stage.dispose;
};

export default mount;
