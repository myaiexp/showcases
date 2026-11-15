// The five linkpath shapes drawn between the same parent and four children
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const SHAPES = ['line', 'arc', 'curve', 'diagonal', 'orthogonal'] as const;
const PANEL = 130;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: PANEL * SHAPES.length,
    height: 120,
    padding: 5,
    autosize: 'none',
    data: [
      {
        name: 'nodes',
        values: [
          { id: 'p', x: 50, y: 10 },
          { id: 'a', x: 8, y: 105 },
          { id: 'b', x: 32, y: 105 },
          { id: 'c', x: 68, y: 105 },
          { id: 'd', x: 92, y: 105 },
        ],
      },
      {
        name: 'edges',
        values: [{ s: 'p', t: 'a' }, { s: 'p', t: 'b' }, { s: 'p', t: 'c' }, { s: 'p', t: 'd' }],
        transform: [
          { type: 'lookup', from: 'nodes', key: 'id', fields: ['s', 't'], as: ['source', 'target'] },
          // One linkpath per shape, each writing its own field so the five results sit side by side.
          ...SHAPES.map((shape) => ({
            type: 'linkpath' as const,
            shape,
            sourceX: 'source.x',
            sourceY: 'source.y',
            targetX: 'target.x',
            targetY: 'target.y',
            as: `path_${shape}`,
          })),
        ],
      },
    ],
    marks: SHAPES.flatMap((shape, i) => [
      {
        type: 'path' as const,
        from: { data: 'edges' },
        encode: {
          enter: { stroke: { value: '#ddd' }, strokeWidth: { value: 2 }, x: { value: i * PANEL }, y: { value: 0 } },
          update: { path: { field: `path_${shape}` } },
        },
      },
      {
        type: 'symbol' as const,
        from: { data: 'nodes' },
        encode: {
          enter: { fill: { value: 'steelblue' }, size: { value: 90 }, x: { field: 'x', offset: i * PANEL }, y: { field: 'y' } },
        },
      },
      {
        type: 'text' as const,
        encode: {
          enter: { x: { value: i * PANEL + 50 }, y: { value: 128 }, text: { value: shape }, align: { value: 'center' as const }, fill: { value: '#ddd' } },
        },
      },
    ]),
  };

  await stage.render(spec);
  return () => stage.dispose();
};

export default mount;
