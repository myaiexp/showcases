// css-doodle/parser exposes the parsers; here the tokenizer and parseGrid on sample input
import { parseGrid, tokenizer } from 'css-doodle/parser';
import type { Mount } from '@/types.ts';
import { codeBlock } from '../../shared/frame.ts';
import { createStage } from '../../shared/stage.ts';

// Their output is an internal structure that may change between versions.
const SAMPLES: [string, () => unknown][] = [
  ["parseGrid('5x4')", () => parseGrid('5x4')],
  ["parseGrid('1x1x8')", () => parseGrid('1x1x8')],
  ["tokenizer('@r(10px, ±5)')", () => tokenizer('@r(10px, ±5)')],
  ["tokenizer('a-1 a -1')", () => tokenizer('a-1 a -1')],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const pre = codeBlock(stage.root, ctx.preview, 360);
  pre.style.maxWidth = ctx.preview ? '240px' : '560px';
  let i = 0;
  const show = (): void => {
    const [label, run] = SAMPLES[i]!;
    stage.say(label);
    pre.textContent = JSON.stringify(run(), null, ctx.preview ? 0 : 1);
    i = (i + 1) % SAMPLES.length;
  };
  show();
  stage.every(2600, show);
  return () => stage.dispose();
};

export default mount;
