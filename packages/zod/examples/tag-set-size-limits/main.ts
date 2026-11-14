// z.set(z.string()).min(1).max(3): a real Set of 1 to 3 tags
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { objectLab } from '../../shared/object-lab.ts';
import { createStage } from '../../shared/stage.ts';

const Tags = z.set(z.string().min(2)).min(1).max(3);

const SAMPLES = [
  { label: 'two tags', value: new Set(['travel', 'food']) },
  { label: 'empty set', value: new Set<string>() },
  { label: 'four tags', value: new Set(['travel', 'food', 'rail', 'maps']) },
  { label: 'an array', value: ['travel', 'food'] },
  { label: 'a number inside', value: new Set(['travel', 7]) },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  objectLab(stage, [{ label: 'tags', code: 'z.set(z.string().min(2)).min(1).max(3)', schema: Tags }], SAMPLES, {
    plan: [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]],
    inTitle: 'Tags',
    editor: false,
  });
  return stage.dispose;
};

export default mount;
