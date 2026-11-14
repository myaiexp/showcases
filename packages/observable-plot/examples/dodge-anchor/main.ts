// dodgeY anchor: piles grow from the bottom, the middle or the top
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const ANCHORS = ['top', 'middle', 'bottom'] as const;
type Anchor = (typeof ANCHORS)[number];

const mount: Mount = async (el, ctx) => {
  const cars = await csv('cars.csv');
  return mountPlot<{ anchor: Anchor }>(el, ctx, {
    initial: { anchor: 'middle' },
    render: ({ anchor }, { width, height, preview }) =>
      Plot.plot({
        width,
        height: height ?? 180,
        marks: [Plot.dot(cars, Plot.dodgeY(anchor, { x: 'weight (lb)', fill: 'currentColor', r: preview ? 1.5 : undefined }))],
      }),
    step: ({ anchor }) => ({ anchor: ANCHORS[(ANCHORS.indexOf(anchor) + 1) % ANCHORS.length] ?? 'middle' }),
    controls: (bar, live) => select(bar, 'anchor', ANCHORS, live.state.anchor, (anchor) => live.set({ anchor })),
  });
};

export default mount;
