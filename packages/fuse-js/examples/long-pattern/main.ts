// A query over 32 letters is searched in 32-letter chunks; any chunk can match the line
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { highlight } from '../../shared/highlight.ts';
import { resultList } from '../../shared/results.ts';
import { searchBox } from '../../shared/search-box.ts';
import { createStage } from '../../shared/stage.ts';
import { pills, textBox } from '../../shared/widgets.ts';
import './style.css';

const FOX = 'the quick brown fox jumps over the lazy dog';
const LINES = [
  FOX,
  'the quick brown fox jumps over the lazy cat',
  'brown fox jumps over the lazy dog',
  'the quick brown fox naps under the old oak',
  'The quick brown fox',
  'the quick brown fox jumps over the lazy dog and runs far into the woods',
];
const PATTERNS = [FOX, 'the quick brown fox jumps', 'the quik brown fox jumps over the lazy dog'];
const MAX = 32;

// How the library cuts a long pattern (src/search/bitap/index.ts): pieces of 32 from the
// start, and a last piece that ends where the pattern ends.
function chunksOf(pattern: string): { start: number; text: string }[] {
  if (pattern.length <= MAX) return [{ start: 0, text: pattern }];
  const out: { start: number; text: string }[] = [];
  const end = pattern.length - (pattern.length % MAX);
  for (let i = 0; i < end; i += MAX) out.push({ start: i, text: pattern.slice(i, i + MAX) });
  if (pattern.length % MAX) out.push({ start: pattern.length - MAX, text: pattern.slice(-MAX) });
  return out;
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'No error is thrown: every piece is searched on its own. A piece that finds nothing counts as a score of 1 in the average.' });
  const box = searchBox(stage.root, stage, { value: FOX, tries: [...PATTERNS, `${FOX} and runs far into the woods`] });
  const info = pills(stage.root);
  const shown = textBox(stage.root, 'lp-chunks');
  const list = resultList(stage.root, { max: stage.preview ? 4 : 6, ranks: false });

  // The options for every call: look anywhere in the line, and allow a few mistakes.
  const options = { ignoreLocation: true, threshold: 0.3, includeMatches: true };

  const run = (): void => {
    const pattern = box.value;
    if (!pattern.trim()) {
      list.show([], 'Type a long query');
      shown.replaceChildren();
      stage.say('');
      return;
    }
    const chunks = chunksOf(pattern);
    info.set('letters', `${pattern.length}`, pattern.length > MAX ? 'warn' : 'ok');
    info.set('chunks', chunks.length);
    const full = document.createElement('div');
    full.className = 'lp-full';
    full.textContent = pattern;
    shown.replaceChildren(
      full,
      ...chunks.map((c, i) => {
        const row = document.createElement('span');
        row.className = 'lp-chunk';
        row.dataset['n'] = String(i + 1);
        const pad = document.createElement('span');
        pad.className = 'lp-pad';
        pad.textContent = ' '.repeat(c.start);
        row.append(pad, c.text);
        return row;
      }),
    );

    let matched = 0;
    list.show(
      LINES.map((line, id) => {
        // The whole long pattern in one call: this is what Fuse reports for the line ...
        const r = Fuse.match(pattern, line, options);
        // ... and each piece on its own, to show where that score comes from.
        const parts = chunks.map((c) => Fuse.match(c.text, line, options).isMatch);
        if (r.isMatch) matched++;
        return {
          id,
          title: r.isMatch ? highlight(line, r.indices) : line,
          badge: parts.map((ok, i) => `${i + 1}${ok ? '✓' : '✗'}`).join(' '),
          score: r.isMatch ? r.score : undefined,
          tone: r.isMatch ? ('ok' as const) : ('dim' as const),
        };
      }),
    );
    stage.say(
      pattern.length > MAX
        ? `${pattern.length} letters, searched as ${chunks.length} chunks: ${matched} of ${LINES.length} lines match`
        : `${pattern.length} letters fit in one chunk: ${matched} of ${LINES.length} lines match`,
      matched ? 'ok' : 'warn',
    );
  };

  box.onInput(run);
  run();
  if (stage.preview) stage.cycle(PATTERNS, 2800, (p) => box.set(p));
  return stage.dispose;
};

export default mount;
