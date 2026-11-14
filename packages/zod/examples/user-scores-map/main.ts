// z.map(z.string(), score): a Map of 1 to 3 entries, bad entries named by their key
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { objectLab } from '../../shared/object-lab.ts';
import { createStage } from '../../shared/stage.ts';

const Scores = z.map(z.string().min(1), z.number().int().min(0).max(100)).min(1).max(3);

const SAMPLES = [
  { label: 'three scores', value: new Map<unknown, unknown>([['ada', 92], ['bob', 75], ['cy', 100]]) },
  { label: 'a bad score', value: new Map<unknown, unknown>([['ada', 92], ['bob', 175]]) },
  { label: 'a bad key', value: new Map<unknown, unknown>([['ada', 92], [7, 50]]) },
  { label: 'too many', value: new Map<unknown, unknown>([['a', 1], ['b', 2], ['c', 3], ['d', 4]]) },
  { label: 'a plain object', value: { ada: 92 } },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  objectLab(stage, [{ label: 'scores', code: 'z.map(z.string(), z.number().int().min(0).max(100)).min(1).max(3)', schema: Scores }], SAMPLES, {
    plan: [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]],
    inTitle: 'Scores',
    editor: false,
  });
  return stage.dispose;
};

export default mount;
