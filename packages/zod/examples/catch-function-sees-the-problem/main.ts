// A catch function chooses the fallback by looking at the error it was handed
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { sampleRows, type Row } from '../../shared/rows.ts';
import { createStage } from '../../shared/stage.ts';
import { codeLine } from '../../shared/widgets.ts';

let told = '';
const Volume = z
  .number()
  .min(0)
  .max(100)
  .catch((ctx) => {
    // ctx.error is the ZodError that was caught; ctx.input is the bad value.
    const code = ctx.error.issues[0]?.code;
    told = `told: ${code}`;
    if (code === 'too_big') return 100;
    if (code === 'too_small') return 0;
    return 50;
  });

const INPUTS = [35, 400, -20, 'loud', null, 100];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each row shows what the catch function was told.' });
  codeLine(stage.root, 'z.number().min(0).max(100).catch(ctx => …ctx.error…)');
  const rows = sampleRows(stage.root, stage, { inTitle: 'Saved volume', outTitle: 'Volume used', showOutput: true });
  const results: Row[] = INPUTS.map((input) => {
    told = '';
    const result = Volume.safeParse(input);
    return { input, result, note: told || 'no catch needed' };
  });
  rows.show(stage.preview ? results.slice(0, 6) : results);
  stage.say('✓ Zod never fails here: too big becomes 100, too small becomes 0, any other mistake 50', 'ok');
  return stage.dispose;
};

export default mount;
