// Data: innerId, the runtime number findOne accepts
import { Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { findDemo } from '../../shared/find-demo.ts';

const mount: Mount = (el, ctx) =>
  findDemo(el, ctx, {
    hint: 'innerId counts up as elements are created and is not stable between runs: never store it. Pick a query.',
    items: (S) => [
      new Rect({ id: 'block', width: S, height: S, fill: '#32cd79' }),
      new Rect({ width: S, height: S, fill: '#32cd79' }),
      new Rect({ width: S, height: S, fill: '#FEB027' }),
    ],
    queries: (leafer, items) => {
      const q: Record<string, () => ReturnType<typeof leafer.findOne>> = {};
      for (const it of items) q[`findOne(${it.innerId})`] = () => leafer.findOne(it.innerId);
      return q;
    },
    note: (hits) => hits.map((h) => h.innerName).join(''),
  }).dispose;

export default mount;
