// "$" at the end of a word keeps files that end with it, "!...$" the ones that do not
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { reading } from '../../shared/ext-reading.ts';
import { lightUp } from '../../shared/ext-shelf.ts';
import { highlight } from '../../shared/highlight.ts';
import { FILES as ALL_FILES } from '../../shared/data.ts';
import { FILES_SMALL } from '../../shared/ext-data.ts';
import { searchBox } from '../../shared/search-box.ts';
import { shelf } from '../../shared/shelf.ts';
import { createStage } from '../../shared/stage.ts';

const STEPS = [
  { query: '.ts$', say: 'End with .ts' },
  { query: '!.go$', say: 'Do not end with .go' },
  { query: '.test.ts$', say: 'End with .test.ts' },
  { query: '.md$', say: 'End with .md' },
];

// A card has room for ten files, the full view for all sixteen.
const mount: Mount = (el, ctx) => {
  const FILES = ctx.preview ? FILES_SMALL : ALL_FILES;
  const stage = createStage(el, ctx, { hint: 'The "$" goes after the ending, like the end of a line. A "!" in front flips it.' });
  const box = searchBox(stage.root, stage, { placeholder: 'Type an ending, then $…', tries: ['.ts$', '!.go$', '.test.ts$', '.md$', '!.ts$'] });
  const read = reading(stage.root, !stage.preview);
  const tiles = shelf(stage.root, FILES.map((label, id) => ({ id, label })), { scores: false });

  const fuse = new Fuse(FILES, { useExtendedSearch: true, includeMatches: true });

  const run = (query: string): void => {
    read.set(query);
    if (!query.trim()) {
      lightUp(tiles, null);
      stage.say('Type an ending followed by $');
      return;
    }
    const results = fuse.search(query);
    lightUp(tiles, results, { nodes: (r) => (query.startsWith('!') ? undefined : highlight(r.item, r.matches?.[0]?.indices)) });
    const step = STEPS.find((s) => s.query === query);
    const lead = step && !stage.preview ? `${step.say}: ` : '';
    stage.say(`${lead}${results.length} of ${FILES.length} files`, results.length ? 'ok' : 'warn');
  };
  box.onInput(run);

  const show = stage.cycle(STEPS, 2600, (s) => box.set(s.query));
  let n = 0;
  if (!stage.preview) button(stage.bar!, 'Next ending', () => show(++n));
  return stage.dispose;
};

export default mount;
