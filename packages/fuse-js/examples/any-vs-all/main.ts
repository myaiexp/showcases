// Add a word to the query: "any" lets more shop items through, "all" lets fewer through
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { codeHeads } from '../../shared/code-heads.ts';
import { searchBox } from '../../shared/search-box.ts';
import { shelf, type Hit } from '../../shared/shelf.ts';
import { createStage } from '../../shared/stage.ts';
import { columns } from '../../shared/widgets.ts';
import { wordsOf } from '../../shared/token-marks.ts';

// A card has room for the first six only.
const ALL_ITEMS = [
  'red wool shirt', 'red cotton hat', 'blue wool shirt', 'blue cotton hat', 'red wool scarf', 'green wool scarf',
  'green cotton shirt', 'blue wool hat', 'red cotton shirt', 'green wool hat', 'blue cotton scarf', 'green cotton scarf',
];
// The query grows one word at a time in a card.
const STEPS = ['red', 'red wool', 'red wool shirt'];

const mount: Mount = (el, ctx) => {
  const SHOP = ctx.preview ? ALL_ITEMS.slice(0, 6) : ALL_ITEMS;
  const stage = createStage(el, ctx, { hint: 'Click the chips (or type) to add a word, and compare how the two columns react.' });
  const box = searchBox(stage.root, stage, { value: STEPS[0], tries: ['red', 'red wool', 'red wool shirt', 'blue hat', 'green scarf cotton'] });
  const cols = columns(stage, ['tokenMatch: any', 'tokenMatch: all']);
  codeHeads(cols);
  const [any, all] = cols;
  const items = SHOP.map((label, id) => ({ id, label }));
  const anyShelf = shelf(any!.body, items, { scores: false });
  const allShelf = shelf(all!.body, items, { scores: false });

  // The only difference between the two instances is tokenMatch ('any' is the default).
  const options = { useTokenSearch: true, threshold: 0.3 };
  const anyFuse = new Fuse(SHOP, { ...options, tokenMatch: 'any' });
  const allFuse = new Fuse(SHOP, { ...options, tokenMatch: 'all' });

  const run = (query: string): void => {
    const n = wordsOf(query).length;
    if (!n) {
      anyShelf.mark(null);
      allShelf.mark(null);
      stage.say('');
      return;
    }
    const light = (fuse: Fuse<string>): Map<number, Hit> => new Map(fuse.search(query).map((r, i) => [r.refIndex, { rank: i + 1 }]));
    const a = light(anyFuse);
    const b = light(allFuse);
    anyShelf.mark(a);
    allShelf.mark(b);
    stage.say(
      n === 1
        ? `One word: both modes let ${a.size} of ${SHOP.length} items through. Add a second word.`
        : `${n} words: "any" lets ${a.size} of ${SHOP.length} items through, "all" only ${b.size}`,
      'info',
    );
  };
  box.onInput(run);
  run(box.value);

  if (stage.preview) {
    stage.cycle(STEPS, 2200, (step) => box.set(step));
  }
  return stage.dispose;
};

export default mount;
