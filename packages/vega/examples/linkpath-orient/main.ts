// vertical, horizontal and radial orientations; radial reads angle and radius instead of x and y
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const ORIENTS = ['vertical', 'horizontal', 'radial'];

  const spec: Spec = {
    width: 660,
    height: 190,
    padding: 5,
    autosize: 'none',
    signals: [{ name: 'shape', value: 'curve', bind: { input: 'select', options: ['line', 'arc', 'curve', 'diagonal', 'orthogonal'] } }],
    data: [
      {
        name: 'nodes',
        values: [
          { id: 2, x: 0, y: 100 },
          { id: 3, x: -75, y: 175 },
          { id: 5, x: 75, y: 175 },
          { id: 6, x: -50, y: 25 },
          { id: 7, x: 50, y: 25 },
        ],
        transform: [
          { type: 'formula', as: 'angle', expr: 'atan2(datum.y, datum.x)' },
          { type: 'formula', as: 'radius', expr: 'hypot(datum.y, datum.x)' },
        ],
      },
      {
        name: 'edges',
        values: [{ s: 2, t: 3 }, { s: 2, t: 5 }, { s: 2, t: 6 }, { s: 2, t: 7 }],
        transform: [
          { type: 'lookup', from: 'nodes', key: 'id', fields: ['s', 't'], as: ['source', 'target'] },
          { type: 'linkpath', orient: 'vertical', shape: { signal: 'shape' }, sourceX: 'source.x', sourceY: 'source.y', targetX: 'target.x', targetY: 'target.y', as: 'p_vertical' },
          { type: 'linkpath', orient: 'horizontal', shape: { signal: 'shape' }, sourceX: 'source.x', sourceY: 'source.y', targetX: 'target.x', targetY: 'target.y', as: 'p_horizontal' },
          // Radial: the "x" coordinates are angles in radians and the "y" ones are radii.
          { type: 'linkpath', orient: 'radial', shape: { signal: 'shape' }, sourceX: 'source.angle', sourceY: 'source.radius', targetX: 'target.angle', targetY: 'target.radius', as: 'p_radial' },
        ],
      },
    ],
    marks: ORIENTS.flatMap((orient, i) => [
      {
        type: 'path' as const,
        from: { data: 'edges' },
        encode: {
          enter: { stroke: { value: '#ddd' }, strokeWidth: { value: 2 }, x: { value: i * 220 + 100 }, y: { value: 0 } },
          update: { path: { field: `p_${orient}` } },
        },
      },
      {
        type: 'symbol' as const,
        from: { data: 'nodes' },
        encode: {
          // Radial paths are drawn in polar space, but the dots sit at their cartesian positions.
          enter: { fill: { value: 'steelblue' }, size: { value: 90 }, x: { field: 'x', offset: i * 220 + 100 }, y: { field: 'y' } },
        },
      },
      {
        type: 'text' as const,
        encode: { enter: { x: { value: i * 220 + 100 }, y: { value: 192 }, text: { value: orient }, align: { value: 'center' as const }, fill: { value: '#ddd' } } },
      },
    ]),
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'shape', ['curve', 'diagonal', 'orthogonal', 'arc', 'line'], 1600);
  return () => stage.dispose();
};

export default mount;
