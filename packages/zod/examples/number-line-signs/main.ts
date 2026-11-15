// Number strip: positive, nonnegative, negative, nonpositive around zero
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { stripTour } from '../../shared/number-strip.ts';
import { createStage } from '../../shared/stage.ts';

const VARIANTS = [
  { label: 'positive()', code: 'z.number().positive()', schema: z.number().positive(), say: 'positive(): above zero. Zero itself is out' },
  { label: 'nonnegative()', code: 'z.number().nonnegative()', schema: z.number().nonnegative(), say: 'nonnegative(): zero or above. Zero is in' },
  { label: 'negative()', code: 'z.number().negative()', schema: z.number().negative(), say: 'negative(): below zero. Zero is out' },
  { label: 'nonpositive()', code: 'z.number().nonpositive()', schema: z.number().nonpositive(), say: 'nonpositive(): zero or below. Zero is in' },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The outlined cell is zero, the number the four names disagree about.' });
  stripTour(stage, VARIANTS, -6, 6, 0, 3);
  return stage.dispose;
};

export default mount;
