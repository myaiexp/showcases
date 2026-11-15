// Emoji and accents: JS .length against the code points z.string() counts
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { sampleRows } from '../../shared/rows.ts';
import { createStage } from '../../shared/stage.ts';
import { codeLine } from '../../shared/widgets.ts';

// Each sample is checked against a length rule that matches what a person would count.
const SAMPLES = [
  { text: '😀', want: 1, why: 'one emoji' },
  { text: 'é', want: 1, why: 'one letter' },
  { text: 'é', want: 2, why: 'e + combining accent' },
  { text: '🧑‍🍼', want: 3, why: 'person + joiner + bottle' },
  { text: 'tuna', want: 4, why: 'four letters' },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  codeLine(stage.root, 'z.string().length(n)  // n counts code points');
  const rows = sampleRows(stage.root, stage, { inTitle: 'Text', outTitle: 'Zod says', showOutput: false });
  rows.show(
    SAMPLES.map(({ text, want, why }) => ({
      input: text,
      result: z.string().length(want).safeParse(text),
      note: `.length ${text.length}, Zod counts ${want}: ${why}`,
    })),
  );
  stage.say('Zod counts code points: the emoji is 1 although JavaScript\'s .length says 2', 'ok');
  return stage.dispose;
};

export default mount;
