// z.tuple([method], path): one fixed slot, then any number of items checked by the rest schema
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { objectLab } from '../../shared/object-lab.ts';
import { createStage } from '../../shared/stage.ts';

// ["GET", ...paths]: the first slot is a method, every later item is a path.
const Request = z.tuple([z.enum(['GET', 'POST', 'DELETE'])], z.string().startsWith('/'));

const SAMPLES = [
  { label: 'GET, 3 paths', value: ['GET', '/home', '/cart', '/help'] },
  { label: 'just the method', value: ['GET'] },
  { label: 'bad third item', value: ['POST', '/orders', 'orders/7', '/pay'] },
  { label: 'unknown method', value: ['FETCH', '/home'] },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Add as many paths as you like: each is checked by the rest schema.' });
  objectLab(stage, [{ label: 'request', code: "z.tuple([z.enum(['GET','POST','DELETE'])], z.string().startsWith('/'))", schema: Request }], SAMPLES, {
    plan: [[0, 0], [0, 2], [0, 3], [0, 1]],
    inTitle: 'Request',
  });
  return stage.dispose;
};

export default mount;
