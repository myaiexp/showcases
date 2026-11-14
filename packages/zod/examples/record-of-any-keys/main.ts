// z.record(z.string(), z.string()): free keys, every value checked, issues pinned to the key
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { objectLab } from '../../shared/object-lab.ts';
import { createStage } from '../../shared/stage.ts';

const Avatars = z.record(z.string(), z.url());

const SAMPLES = [
  { label: 'two users', value: { carlotta: 'https://img.example/c.png', jimmie: 'https://img.example/j.png' } },
  { label: 'one broken value', value: { carlotta: 'https://img.example/c.png', jimmie: 42 } },
  { label: 'two broken values', value: { carlotta: 'no link', jimmie: 'https://img.example/j.png', sam: null } },
  { label: 'empty', value: {} },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Add any key you like: only the values are checked.' });
  objectLab(stage, [{ label: 'avatars', code: 'z.record(z.string(), z.url())  // user id → link', schema: Avatars }], SAMPLES, {
    plan: [[0, 0], [0, 1], [0, 3]],
    inTitle: 'Avatars',
  });
  return stage.dispose;
};

export default mount;
