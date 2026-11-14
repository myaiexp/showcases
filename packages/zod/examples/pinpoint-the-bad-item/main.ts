// A ratings list: every wrong entry gets its own issue, pinned to its position
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { objectLab } from '../../shared/object-lab.ts';
import { createStage } from '../../shared/stage.ts';

// Each rating is a whole number from 1 to 5.
const Ratings = z.array(z.number().int().min(1).max(5));

const SAMPLES = [
  { label: 'all fine', value: [5, 4, 4, 3, 5] },
  { label: 'a 9 at position 3', value: [5, 4, 4, 9, 5] },
  { label: 'text and a decimal', value: [5, '4', 4, 3.5, 5] },
  { label: 'a hole', value: [5, 4, null, 3] },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Edit a rating in the JSON: the issue path is the list position.' });
  objectLab(
    stage,
    [{ label: 'ratings', code: 'z.array(z.number().int().min(1).max(5))', schema: Ratings }],
    SAMPLES,
    {
      plan: [[0, 1], [0, 2], [0, 0]],
      inTitle: 'Ratings',
    },
  );
  return stage.dispose;
};

export default mount;
