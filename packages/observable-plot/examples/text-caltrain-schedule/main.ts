// Text: a stem-and-leaf train schedule from stackX2 text coloured by train type
import * as d3 from 'd3';
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const caltrain = await csv('caltrain.csv');
  return mountStatic(el, ctx, ({ height, preview }) =>
    Plot.plot({
      width: 240,
      height,
      axis: null,
      x: { type: 'point' },
      y: { type: 'point', domain: d3.range(4, 25) },
      color: { domain: 'NLB', range: ['currentColor', 'peru', 'brown'], legend: !preview },
      marks: [
        Plot.text([[0.5, 4]], { text: ['Northbound'], textAnchor: 'start', dx: 16 }),
        Plot.text([[-0.5, 4]], { text: ['Southbound'], textAnchor: 'end', dx: -16 }),
        Plot.text(d3.range(5, 25), { x: 0, y: Plot.identity, text: (y: number) => `${y % 12 || 12}${y % 24 >= 12 ? 'p' : 'a'}` }),
        Plot.text(caltrain, Plot.stackX2({ x: (d) => (d.orientation === 'N' ? 1 : -1), y: 'hours', fill: 'type', text: 'minutes' })),
        Plot.ruleX([-0.5, 0.5]),
      ],
    }),
  );
};

export default mount;
