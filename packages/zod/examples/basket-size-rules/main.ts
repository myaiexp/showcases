// The same baskets through four array size rules: nonempty, min, max, length
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { inlineCompare } from '../../shared/inline-compare.ts';

const items = z.string();

const BASKETS: unknown[] = [[], ['tea'], ['tea', 'mug'], ['tea', 'mug', 'jam'], ['tea', 'mug', 'jam', 'rye', 'oat', 'figs']];

const mount: Mount = (el, ctx) =>
  inlineCompare(el, ctx, {
    inputs: BASKETS,
    variants: [
      { label: 'nonempty()', code: 'z.array(z.string()).nonempty()  // at least 1 item', schema: z.array(items).nonempty() },
      { label: 'min(2)', code: 'z.array(z.string()).min(2)  // 2 or more items', schema: z.array(items).min(2) },
      { label: 'max(5)', code: 'z.array(z.string()).max(5)  // 5 or fewer items', schema: z.array(items).max(5) },
      { label: 'length(3)', code: 'z.array(z.string()).length(3)  // exactly 3 items', schema: z.array(items).length(3) },
    ],
    hint: 'Pick a rule: the same five baskets are checked against it.',
  });

export default mount;
