// Number strip: gt, gte, lt and lte light up the accepted whole numbers
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { stripTour } from '../../shared/number-strip.ts';
import { createStage } from '../../shared/stage.ts';

const VARIANTS = [
  { label: 'gt(5)', code: 'z.number().gt(5)', schema: z.number().gt(5), say: 'gt(5): greater than 5, so 5 itself stays out' },
  { label: 'gte(5)', code: 'z.number().gte(5)', schema: z.number().gte(5), say: 'gte(5): 5 or more, so 5 gets in (also written min(5))' },
  { label: 'lt(5)', code: 'z.number().lt(5)', schema: z.number().lt(5), say: 'lt(5): less than 5, so 5 stays out' },
  { label: 'lte(5)', code: 'z.number().lte(5)', schema: z.number().lte(5), say: 'lte(5): 5 or less, so 5 gets in (also written max(5))' },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a rule, then slide the test value: the outlined cell is the number being checked.' });
  stripTour(stage, VARIANTS, -5, 15, 5);
  return stage.dispose;
};

export default mount;
