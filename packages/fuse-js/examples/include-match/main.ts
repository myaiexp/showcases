// "'word" keeps items containing those exact letters, where fuzzy also takes near-misses
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { reading } from '../../shared/ext-reading.ts';
import { lightUp } from '../../shared/ext-shelf.ts';
import { highlight } from '../../shared/highlight.ts';
import { searchBox, typeLoop } from '../../shared/search-box.ts';
import { shelf } from '../../shared/shelf.ts';
import { createStage } from '../../shared/stage.ts';
import { columns } from '../../shared/widgets.ts';

const NAMES = ['Python', 'CPython', 'Python script', 'Pythonic style', 'Monty Python', 'Pyton', 'Pithon'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Type a word. The apostrophe means: these exact letters, in this order, anywhere in the name." });
  const box = searchBox(stage.root, stage, { placeholder: 'Type a word…', value: 'python', tries: ['python', 'thon', 'pyton', 'monty'] });
  const [loose, strict] = columns(stage, ['Fuzzy', "Include: '"], stage.root);
  const items = NAMES.map((label, id) => ({ id, label }));
  const looseTiles = shelf(loose!.body, items, { scores: false });
  const strictTiles = shelf(strict!.body, items, { scores: false });
  const read = reading(stage.root, !stage.preview);

  // includeMatches gives the letter ranges the include operator found.
  const fuse = new Fuse(NAMES, { useExtendedSearch: true, includeMatches: true });

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
    const include = fuse.search(`'${w}`);
    lightUp(looseTiles, fuzzy, { nodes: (r) => highlight(r.item, r.matches?.[0]?.indices) });
    lightUp(strictTiles, include, { nodes: (r) => highlight(r.item, r.matches?.[0]?.indices) });
    loose!.head.textContent = `Fuzzy: ${w}`;
    strict!.head.textContent = `Include: '${w}`;
    read.set(`'${w}`);
    const extra = fuzzy.length - include.length;
    if (stage.preview) stage.say(`Fuzzy lights ${fuzzy.length}, include ${include.length}`, include.length ? 'ok' : 'warn');
    else stage.say(
      `Fuzzy lights ${fuzzy.length} names, "'${w}" ${include.length}${extra > 0 ? `: ${extra} near-miss${extra > 1 ? 'es' : ''} drop out` : ''}`,
      include.length ? 'ok' : 'warn',
    );
  };
  box.onInput(run);
  run(box.value);
  typeLoop(stage, box, ['python', 'thon', 'pyton']);
  return stage.dispose;
};

export default mount;
