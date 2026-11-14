// z.number() against NaN and the infinities, with z.nan() as the opposite
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { schemaTour } from '../../shared/schema-tour.ts';
import { createStage } from '../../shared/stage.ts';

const INPUTS = [3.14, 0, 1e308, NaN, Infinity, -Infinity, 'NaN'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  schemaTour(
    stage,
    [
      { label: 'z.number()', code: 'z.number()  // any finite number', schema: z.number(), say: 'z.number() lets finite numbers in and turns NaN and both infinities away' },
      { label: 'z.nan()', code: 'z.nan()  // NaN and nothing else', schema: z.nan(), say: 'z.nan() is the mirror image: NaN passes, even real numbers do not' },
    ],
    { inputs: INPUTS, cardInputs: [3.14, NaN, Infinity, -Infinity, 'NaN'], types: true, outTitle: 'Zod says' },
  );
  return stage.dispose;
};

export default mount;
