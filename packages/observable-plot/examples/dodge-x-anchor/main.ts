// dodgeX anchor: piles grow from the left, the middle or the right
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const ANCHORS = ['left', 'middle', 'right'] as const;
type Anchor = (typeof ANCHORS)[number];

const mount: Mount = async (el, ctx) => {
  const cars = await csv('cars.csv');
  return mountPlot<{ anchor: Anchor }>(el, ctx, {
    initial: { anchor: 'left' },
    render: ({ anchor }, { width, height, preview }) =>
      Plot.plot({
        width,
        height: height ?? 420,
        marks: [Plot.dot(cars, Plot.dodgeX(anchor, { y: 'weight (lb)', fill: 'currentColor', r: preview ? 1.6 : undefined }))],
      }),
    step: ({ anchor }) => ({ anchor: ANCHORS[(ANCHORS.indexOf(anchor) + 1) % ANCHORS.length] ?? 'left' }),
    controls: (bar, live) => select(bar, 'anchor', ANCHORS, live.state.anchor, (anchor) => live.set({ anchor })),
  });
};

export default mount;
