// Axis theme layers: axis, axisBand/axisLinear, axisX/axisY
import type { Mount } from '@/types.ts';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

type Layer = 'axis' | '+ axisBand / axisLinear' | '+ axisX / axisY';

const CATS = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5'];
const rows = CATS.map((x, i) => ({ x, v: 18 + ((i * 11) % 32) }));
const label = (fill: string, fontSize = 13): unknown => ({ label: { style: { fill, fontSize } } });

// Each layer gives the axis labels another colour, so the one that applies is visible.
function component(layer: Layer): unknown {
  const axis = { axis: { ...(label('#9AA3B5') as object), grid: { style: { stroke: '#3A4152' } } } };
  const kind = { axisBand: label('#FF9D2C', 15), axisLinear: label('#7BCF8E', 15) };
  const xy = { axisX: label('#FF6B6B', 17), axisY: label('#80D8FB', 17) };
  return layer === 'axis' ? axis : layer === '+ axisBand / axisLinear' ? { ...axis, ...kind } : { ...axis, ...kind, ...xy };
}

const LAYERS: Layer[] = ['axis', '+ axisBand / axisLinear', '+ axisX / axisY'];

const mount: Mount = (el, ctx) =>
  mountLive<{ layer: Layer }>(el, ctx, {
    initial: { layer: 'axis' },
    build: ({ layer }) =>
      ({
        type: 'bar',
        data: [{ id: 'rows', values: rows }],
        xField: 'x',
        yField: 'v',
        theme: { component: component(layer) },
      }) as never,
    controls(bar, live) {
      select(bar, 'axis theme layers', LAYERS, (layer) => live.set({ layer: layer as Layer }));
    },
    step: (_, i) => ({ layer: LAYERS[i % LAYERS.length] ?? 'axis' }),
    mode: 'rebuild',
    previewMs: 1700,
  });

export default mount;
