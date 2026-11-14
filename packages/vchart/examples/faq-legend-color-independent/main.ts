// FAQ: a legend colour that differs from the chart, via legends.item.shape and legends.data
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, every, select } from '../../shared/chart.ts';
import { pick } from '../../shared/components-data.ts';

const MODES = ['follows the chart', 'item.shape override', 'data callback'] as const;
const SYMBOLS = ['circle', 'diamond', 'triangle', 'star', 'square'];

const build = (mode: string): ISpec => {
  const legends: Record<string, unknown> = { visible: true, orient: 'right' };
  if (mode === 'item.shape override') {
    // One style for every item: a yellow marker with a white border, whatever the slice colour.
    legends.item = { shape: { style: { fill: '#facc15', stroke: '#ffffff', lineWidth: 2, symbolType: 'rect' } } };
  } else if (mode === 'data callback') {
    // Per item: each legend datum carries its own shape, here the slice colour with a white border and its own symbol.
    legends.data = (items: { shape: Record<string, unknown> }[]) =>
      items.map((item, i) => ({
        ...item,
        shape: { ...item.shape, stroke: '#ffffff', lineWidth: 2, symbolType: pick(SYMBOLS, i) },
      }));
  }
  return {
    type: 'pie',
    data: [
      {
        id: 'd',
        values: [
          { type: 'Oxygen', value: 46.6 },
          { type: 'Silicon', value: 27.7 },
          { type: 'Aluminium', value: 8.1 },
          { type: 'Iron', value: 5 },
          { type: 'Calcium', value: 3.6 },
        ],
      },
    ],
    categoryField: 'type',
    valueField: 'value',
    legends,
  } as unknown as ISpec;
};

const mount: Mount = (el, ctx) => {
  let chart = createChart(el, ctx, build(MODES[0]));
  // Removing keys is not reliable with updateSpec, so each mode gets a fresh chart.
  const rebuild = (mode: string): void => {
    chart.release();
    chart = createChart(el, ctx, build(mode));
  };
  if (!ctx.preview) {
    const bar = controlBar(el);
    el.prepend(bar);
    select(bar, 'legend colour', MODES, rebuild);
  }
  let i = 0;
  const stop = every(1800, () => {
    i += 1;
    if (ctx.preview) rebuild(pick(MODES, i));
  });
  return () => {
    stop();
    chart.release();
  };
};

export default mount;
