// avoidMarks keeps labels off a named line mark, not just off their own symbols
import type { Mark, Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { namedPoints } from '../../shared/layout-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const points = namedPoints(8, 22);
  const SIDE = 210;

  // The same chart twice: labels, a trend line, and a label transform that does or does not avoid it.
  const panel = (title: string, x: number, avoid: boolean): Mark => ({
    type: 'group' as const,
    encode: { enter: { x: { value: x }, y: { value: 0 }, width: { value: SIDE }, height: { value: SIDE }, stroke: { value: '#555' } } },
    marks: [
      { type: 'text' as const, encode: { enter: { x: { value: SIDE / 2 }, y: { value: -10 }, text: { value: title }, align: { value: 'center' as const }, fill: { value: '#ddd' } } } },
      {
        name: 'dots',
        type: 'symbol' as const,
        from: { data: 'points' },
        encode: {
          enter: { fill: { value: 'steelblue' }, size: { value: 60 }, x: { scale: 'x', field: 'u' }, y: { scale: 'y', field: 'v' } },
        },
      },
      {
        name: 'trend',
        type: 'line' as const,
        from: { data: 'trend' },
        encode: {
          enter: { stroke: { value: 'orange' }, strokeWidth: { value: 3 }, x: { scale: 'x', field: 'u' }, y: { scale: 'y', field: 'v' } },
        },
      },
      {
        type: 'text' as const,
        from: { data: 'dots' },
        encode: { enter: { text: { field: 'datum.name' }, fontSize: { value: 10 }, fill: { value: '#ddd' } } },
        transform: [
          {
            type: 'label' as const,
            ...(avoid ? { avoidMarks: ['trend'] } : {}),
            anchor: ['top', 'bottom', 'right', 'left'],
            offset: [2],
            size: [SIDE, SIDE] as [number, number],
          },
        ],
      },
    ],
  });

  const spec: Spec = {
    width: SIDE * 2 + 40,
    height: SIDE,
    padding: { top: 25, left: 5, right: 5, bottom: 5 },
    autosize: 'none',
    data: [
      { name: 'points', values: points },
      { name: 'trend', values: Array.from({ length: 21 }, (_, i) => ({ u: i / 20, v: 1 - i / 20 })) },
    ],
    scales: [
      { name: 'x', domain: [0, 1], range: [8, SIDE - 8] },
      { name: 'y', domain: [0, 1], range: [8, SIDE - 8] },
    ],
    marks: [panel('No avoidMarks', 0, false), panel("avoidMarks: ['trend']", SIDE + 40, true)],
  };

  await stage.render(spec);
  return () => stage.dispose();
};

export default mount;
