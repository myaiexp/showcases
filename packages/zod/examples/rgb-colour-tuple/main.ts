// An RGB colour as z.tuple of three channels: fixed length, one rule per position
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { objectLab } from '../../shared/object-lab.ts';
import { createStage } from '../../shared/stage.ts';

const channel = z.number().int().min(0).max(255);
const Rgb = z.tuple([channel, channel, channel]);

const SAMPLES = [
  { label: 'orange', value: [255, 140, 0] },
  { label: 'only two', value: [255, 140] },
  { label: 'four values', value: [255, 140, 0, 1] },
  { label: '300 and 12.5', value: [300, 12.5, 0] },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Change the numbers or drop one: the length is part of the rule.' });
  objectLab(stage, [{ label: 'rgb', code: 'z.tuple([channel, channel, channel])  // channel: int 0..255', schema: Rgb }], SAMPLES, {
    plan: [[0, 0], [0, 1], [0, 3], [0, 2]],
    inTitle: 'Colour',
  });
  return stage.dispose;
};

export default mount;
