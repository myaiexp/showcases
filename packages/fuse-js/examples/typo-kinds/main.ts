// One word, mistyped four ways, each scored on its own with Fuse.match
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { slider, textInput } from '../../shared/controls.ts';
import { highlight } from '../../shared/highlight.ts';
import { resultList, type Row } from '../../shared/results.ts';
import { createStage } from '../../shared/stage.ts';
import { pills } from '../../shared/widgets.ts';

const WORDS = ['test', 'javascript', 'banana'];

// Each kind of edit, applied at letter `i` of the word.
const KINDS: [string, (w: string, i: number) => string][] = [
  ['correct', (w) => w],
  ['wrong letter', (w, i) => w.slice(0, i) + 'x' + w.slice(i + 1)],
  ['extra letter', (w, i) => w.slice(0, i) + w[i] + w.slice(i)],
  ['missing letter', (w, i) => w.slice(0, i) + w.slice(i + 1)],
  ['swapped letters', (w, i) => (i + 1 < w.length ? w.slice(0, i) + w[i + 1] + w[i] + w.slice(i + 2) : w)],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Edits at the very start or end of the word can come out free: an extra letter there leaves the word intact inside the text.' });
  const info = stage.preview ? pills(stage.root) : null;
  const list = resultList(stage.root, { max: 5, ranks: false });
  let word = WORDS[0]!;
  let at = 1;

  const run = (): void => {
    if (word.length < 3) {
      list.show([], 'Type a word of 3 letters or more');
      stage.say('');
      return;
    }
    const i = Math.min(at, word.length - 1);
    const rows: Row[] = KINDS.map(([kind, edit]) => {
      const typo = edit(word, i);
      // Fuse.match scores one pattern against one string. Matches (the letters) need includeMatches.
      const m = Fuse.match(word, typo, { includeMatches: true, ignoreLocation: true });
      return {
        id: kind,
        title: m.isMatch ? highlight(typo, m.indices) : typo,
        badge: kind,
        score: m.isMatch ? m.score : undefined,
        tone: m.isMatch ? undefined : 'bad',
      };
    });
    list.show(rows);
    info?.set('word', word);
    const swapped = Fuse.match(word, KINDS[4]![1](word, i), { ignoreLocation: true });
    const wrong = Fuse.match(word, KINDS[1]![1](word, i), { ignoreLocation: true });
    stage.say(
      swapped.isMatch && wrong.isMatch
        ? `"${word}": a wrong letter scores ${wrong.score.toFixed(2)}, swapped letters ${swapped.score.toFixed(2)} (0 is perfect)`
        : `"${word}": the swap is too far off to match at the default threshold`,
      'info',
    );
  };

  if (stage.preview) {
    stage.cycle(WORDS, 2600, (w) => {
      word = w;
      run();
    });
  } else if (stage.bar) {
    textInput(stage.bar, 'word', word, (v) => ((word = v.trim()), run()), 12);
    slider(stage.bar, 'letter', 0, 11, 1, at, (v) => ((at = v), run()));
    run();
  }
  return stage.dispose;
};

export default mount;
