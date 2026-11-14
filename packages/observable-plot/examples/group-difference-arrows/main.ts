// Arrows from female to male counts per sport, built from custom group reducers
import * as Plot from '@observablehq/plot';
import * as d3 from 'd3';
import type { Mount } from '@/types.ts';
import { csv } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const olympians = await csv('athletes.csv');
  return mountStatic(el, ctx, ({ width, height, preview }) =>
    Plot.plot({
      width,
      height,
      marginBottom: preview ? 10 : 100,
      x: { label: null, tickRotate: 90, axis: preview ? null : 'bottom' },
      y: { grid: true, label: 'Frequency' },
      color: { type: 'categorical', domain: [-1, 1], unknown: '#aaa', transform: Math.sign },
      marks: [
        Plot.ruleY([0]),
        Plot.link(
          olympians,
          Plot.groupX(
            {
              // A reducer may be a function of each group's values.
              y1: (D: string[]) => d3.sum(D, (d) => (d === 'female' ? 1 : 0)),
              y2: (D: string[]) => d3.sum(D, (d) => (d === 'male' ? 1 : 0)),
              stroke: (D: string[]) => d3.sum(D, (d) => (d === 'male' ? 1 : 0)) - d3.sum(D, (d) => (d === 'female' ? 1 : 0)),
            },
            { x: 'sport', y1: 'sex', y2: 'sex', markerStart: 'dot', markerEnd: 'arrow', stroke: 'sex', strokeWidth: 2 },
          ),
        ),
      ],
    }),
  );
};

export default mount;
