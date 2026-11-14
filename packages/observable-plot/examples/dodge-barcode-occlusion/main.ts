// Car weights as plain dots, barcode ticks, or a dodged beeswarm
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const VIEWS = ['dotX', 'ruleX', 'dotX + dodgeY'] as const;
type View = (typeof VIEWS)[number];

const mount: Mount = async (el, ctx) => {
  const cars = await csv('cars.csv');
  return mountPlot<{ view: View }>(el, ctx, {
    initial: { view: 'dotX' },
    render: ({ view }, { width, height, preview }) => {
      const mark =
        view === 'dotX'
          ? Plot.dotX(cars, { x: 'weight (lb)' })
          : view === 'ruleX'
            ? Plot.ruleX(cars, { x: 'weight (lb)' })
            : Plot.dotX(cars, Plot.dodgeY({ x: 'weight (lb)', r: preview ? 2 : undefined }));
      // Plain dots and rules pile onto one line and hide each other; dodge spreads them.
      return Plot.plot({ width, height: height ?? 180, marks: [mark] });
    },
    step: ({ view }) => ({ view: VIEWS[(VIEWS.indexOf(view) + 1) % VIEWS.length] ?? 'dotX' }),
    controls: (bar, live) => select(bar, 'marks', VIEWS, live.state.view, (view) => live.set({ view })),
  });
};

export default mount;
