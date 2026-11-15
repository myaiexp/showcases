// select: first, last, min or max row per region, drawn over every order
import { defineChart, dot, select } from '@tanstack/charts';
import type { SelectMethod } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleUtc } from '@tanstack/charts/scales/time';
import type { Mount } from '@/types.ts';
import { makeOrders } from '../../shared/xform-data.ts';
import { lab } from '../../shared/xform-lab.ts';
import { createStage } from '../../shared/stage.ts';

const orders = makeOrders(40);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Coloured dots are the selected rows; they are the same objects as in the source.' });

  const build = (method: SelectMethod) => {
    const picked = select(orders, { by: 'region', value: 'amount', select: method as 'min' });
    return defineChart({
      marks: [
        dot(orders, { x: 'createdAt', y: 'amount', fill: '#475569', r: 2 }),
        dot(picked, { x: 'createdAt', y: 'amount', color: 'region', r: 7 }),
      ],
      scales: { x: { scale: scaleUtc }, y: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Amount' } } },
    });
  };
  const states = (['first', 'last', 'min', 'max'] as const).map((m) => [m, `select: '${m}'`] as const);
  lab(stage, { label: 'method', ariaLabel: 'Orders with one selected row per region', states, build, ms: 1800, after: (_, name) => stage.say(`${name}, by region`) });
  return () => stage.dispose();
};

export default mount;
