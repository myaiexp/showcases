// What a score means: queries from perfect to hopeless, each against one title
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { marked } from '../../shared/highlight.ts';
import { resultList, type Row } from '../../shared/results.ts';
import { searchBox } from '../../shared/search-box.ts';
import { createStage } from '../../shared/stage.ts';
import { q } from '../../shared/widgets.ts';

const TARGET = 'The Great Gatsby';
const LADDER = [
  ['The Great Gatsby', 'every letter'],
  ['great gatsby', 'a word missing'],
  ['The Great Gatsbi', 'one letter wrong'],
  ['gatsby', 'one word'],
  ['The Gret Gtsby', 'two letters dropped'],
  ['gatsbi', 'one word, one wrong'],
  ['gtsby', 'a word, squashed'],
  ['wizard', 'a different book'],
] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: `Every query is searched against one title: "${TARGET}". Add your own at the top.` });
  const box = searchBox(stage.root, stage, { placeholder: 'Your own query…', tries: ['gatsby', 'grate gatsbi', 'tolkien'] });
  const list = resultList(stage.root, { max: 9, ranks: false });
  let picks: readonly number[] = LADDER.map((_, i) => i);

  // includeScore adds a `score` to each result: 0 is a perfect match, 1 is no match at all.
  const fuse = new Fuse([TARGET], { includeScore: true, includeMatches: true });

  const row = (query: string, note: string): Row => {
    const hit = fuse.search(query)[0];
    return {
      id: query,
      title: hit ? marked(hit, undefined, TARGET) : query,
      sub: `${q(query)}: ${note}`,
      score: hit?.score,
      badge: hit ? undefined : 'no match',
      tone: hit ? undefined : 'dim',
    };
  };

  const run = (): void => {
    const own = box.value.trim();
    const rows = [...(own ? [row(own, 'what you typed')] : []), ...picks.map((i) => row(LADDER[i]![0], LADDER[i]![1]))];
    list.show(rows);
    const mine = own ? fuse.search(own)[0] : undefined;
    stage.say(
      mine ? `"${own}" scores ${mine.score!.toFixed(2)}: closer to 0 is closer to the title` : 'Scores run from 0 (every letter) up towards 1 (nothing in common); past the threshold, there is no result at all',
      'info',
    );
  };

  box.onInput(run);
  if (stage.preview) {
    // A card has room for three rows: perfect, somewhere in between, and no match.
    const steps = [[0, 2, 7], [0, 3, 7], [0, 5, 7]];
    stage.cycle(steps, 1900, (s) => ((picks = s), run()));
  } else run();
  return stage.dispose;
};

export default mount;
