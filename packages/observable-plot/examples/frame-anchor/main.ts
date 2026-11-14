// Frame anchor: draw only the left, right, top or bottom side of the frame
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const ANCHORS = ['bottom', 'left', 'top', 'right', 'all sides'] as const;

const mount: Mount = (el, ctx) =>
  mountPlot<{ anchor: (typeof ANCHORS)[number] }>(el, ctx, {
    initial: { anchor: 'bottom' },
    render: ({ anchor }, { width, height }) =>
      Plot.plot({
        width,
        height,
        x: { domain: [0, 1], grid: true },
        marks: [Plot.frame({ stroke: 'red', anchor: anchor === 'all sides' ? undefined : anchor })],
      }),
    step: ({ anchor }) => ({ anchor: ANCHORS[(ANCHORS.indexOf(anchor) + 1) % ANCHORS.length] }),
    previewMs: 1800,
    controls: (bar, live) => select(bar, 'anchor', ANCHORS, live.state.anchor, (anchor) => live.set({ anchor })),
  });

export default mount;
