// A row of [name, age, subscribed]: a different schema in each position
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { objectLab } from '../../shared/object-lab.ts';
import { createStage } from '../../shared/stage.ts';

const Row = z.tuple([z.string().min(1), z.number().int().nonnegative(), z.boolean()]);

const SAMPLES = [
  { label: 'Ada, 36, yes', value: ['Ada', 36, true] },
  { label: 'columns swapped', value: [36, 'Ada', true] },
  { label: 'everything as text', value: ['Ada', '36', 'yes'] },
  { label: 'a column missing', value: ['Ada', 36] },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The same value in a different column fails: position decides the rule.' });
  objectLab(stage, [{ label: 'row', code: 'z.tuple([z.string().min(1), z.number().int().nonnegative(), z.boolean()])', schema: Row }], SAMPLES, {
    plan: [[0, 0], [0, 1], [0, 2], [0, 3]],
    inTitle: 'CSV row',
  });
  return stage.dispose;
};

export default mount;
