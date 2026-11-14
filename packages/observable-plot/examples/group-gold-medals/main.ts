// Sport by gold medals won: cells, dots sized by count, or dots stroked by sex
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const VIEWS = ['cell fill', 'dot r', 'dot r + stroke sex'] as const;
type View = (typeof VIEWS)[number];

const mount: Mount = async (el, ctx) => {
  const olympians = await csv('athletes.csv');
  return mountPlot<{ view: View }>(el, ctx, {
    initial: { view: 'cell fill' },
    render: ({ view }, { width, height, preview }) => {
      const mark =
        view === 'cell fill'
          ? Plot.cell(olympians, Plot.group({ fill: 'count' }, { x: 'sport', y: 'gold' }))
          : view === 'dot r'
            ? Plot.dot(olympians, Plot.group({ r: 'count' }, { x: 'sport', y: 'gold' }))
            : Plot.dot(olympians, Plot.group({ r: 'count' }, { x: 'sport', y: 'gold', stroke: 'sex' }));
      return Plot.plot({
        width,
        height,
        marginBottom: preview ? 10 : 100,
        x: { label: null, tickRotate: 90, axis: preview ? null : 'bottom' },
        // Dots need a point scale for y; cells use the default band scale.
        y: { type: view === 'cell fill' ? undefined : 'point', label: 'gold', labelAnchor: 'top', labelArrow: true, reverse: true },
        r: { range: [0, preview ? 7 : 12] },
        color: view === 'cell fill' ? { type: 'sqrt', scheme: 'turbo' } : {},
        marks: [mark],
      });
    },
    step: ({ view }) => ({ view: VIEWS[(VIEWS.indexOf(view) + 1) % VIEWS.length] ?? 'cell fill' }),
    controls: (bar, live) => select(bar, 'mark', VIEWS, live.state.view, (view) => live.set({ view })),
  });
};

export default mount;
