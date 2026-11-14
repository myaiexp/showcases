// Car weights as a beeswarm and as a conventional rectY histogram
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const VIEWS = ['beeswarm', 'histogram'] as const;
type View = (typeof VIEWS)[number];

const mount: Mount = async (el, ctx) => {
  const cars = await csv('cars.csv');
  return mountPlot<{ view: View }>(el, ctx, {
    initial: { view: 'histogram' },
    render: ({ view }, { width, height, preview }) =>
      Plot.plot({
        width,
        height: height ?? 180,
        marks:
          view === 'beeswarm'
            ? [Plot.dotX(cars, Plot.dodgeY({ x: 'weight (lb)', fill: 'currentColor', r: preview ? 2 : undefined }))]
            : [Plot.rectY(cars, Plot.binX<Plot.RectYOptions>({ y: 'count' }, { x: 'weight (lb)' })), Plot.ruleY([0])],
      }),
    step: ({ view }) => ({ view: view === 'histogram' ? 'beeswarm' : 'histogram' }),
    controls: (bar, live) => select(bar, 'chart', VIEWS, live.state.view, (view) => live.set({ view })),
  });
};

export default mount;
