// "!word" hides every item that contains the word, next to a plain search for it
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { reading } from '../../shared/ext-reading.ts';
import { lightUp } from '../../shared/ext-shelf.ts';
import { searchBox, typeLoop } from '../../shared/search-box.ts';
import { shelf } from '../../shared/shelf.ts';
import { createStage } from '../../shared/stage.ts';
import { columns } from '../../shared/widgets.ts';

const NAMES = ['Ruby', 'JRuby', 'Ruby on Rails', 'Rubyist', 'Ruby gems', 'Rails', 'Python', 'Rust', 'Sapphire', 'Go'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Type a word, or two words with a space between them: "!ruby !rails" hides both.' });
  const box = searchBox(stage.root, stage, { placeholder: 'Word to hide…', value: '!ruby', tries: ['!ruby', '!rails', '!ruby !rails', '!ru', '!zzz'] });
  const [has, hides] = columns(stage, ['Has the word', 'Hides it: !'], stage.root);
  const items = NAMES.map((label, id) => ({ id, label }));
  const hasTiles = shelf(has!.body, items, { scores: false });
  const hidesTiles = shelf(hides!.body, items, { scores: false });
  const read = reading(stage.root, !stage.preview);

  // The query with "!" in front of each word is the inverse. The same words without it
  // are the plain search on the left, which makes the two lists complements of each other.
  const fuse = new Fuse(NAMES, { useExtendedSearch: true });

  const run = (query: string): void => {
    const words = query.trim().split(/\s+/).filter(Boolean).map((w) => w.replace(/^!/, ''));
    if (!words.length) {
      lightUp(hasTiles, null);
      lightUp(hidesTiles, null);
      read.set('');
      stage.say('Type a "!" and a word');
      return;
    }
    const inverse = fuse.search(words.map((w) => `!${w}`).join(' '));
    // Items the plain words would keep, for the left column (any of the words).
    const plain = fuse.search(words.map((w) => `'${w}`).join(' | '));
    lightUp(hasTiles, plain);
    lightUp(hidesTiles, inverse);
    read.set(words.map((w) => `!${w}`).join(' '));
    stage.say(`${plain.length} of ${NAMES.length} names hidden, ${inverse.length} stay`, 'ok');
  };
  box.onInput(run);
  run(box.value);
  typeLoop(stage, box, ['!ruby', '!rails', '!ruby !rails']);
  return stage.dispose;
};

export default mount;
