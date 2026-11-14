// Area interpolation: the curve option swaps linear for step, basis and more
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const curves = ['linear', 'step', 'step-before', 'step-after', 'basis', 'cardinal', 'catmull-rom', 'monotone-x', 'natural', 'bump-x'] as const;
type Curve = (typeof curves)[number];

const mount: Mount = async (el, ctx) => {
  const sftemp = (await csv('sf-temperatures.csv')).slice(0, 45);
  return mountPlot(el, ctx, {
    initial: { curve: 'linear' as Curve },
    render: ({ curve }, { width, height }) =>
      Plot.plot({
        width,
        height,
        y: { label: 'Temperature (°F)', grid: true },
        marks: [Plot.areaY(sftemp, { x: 'date', y1: 'low', y2: 'high', curve, line: true }), Plot.dot(sftemp, { x: 'date', y: 'high', r: 1.5 })],
      }),
    step: (_s, i) => ({ curve: curves[i % curves.length] }),
    previewMs: 1800,
    controls: (bar, live) => select(bar, 'curve', curves, live.state.curve, (curve) => live.set({ curve })),
  });
};

export default mount;
