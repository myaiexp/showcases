// Tip: nine anchors around a dot in the frame, with pointerSize as a slider
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const ANCHORS = ['top', 'right', 'bottom', 'left', 'top-left', 'top-right', 'bottom-right', 'bottom-left', 'middle'] as const;

const mount: Mount = (el, ctx) =>
  mountPlot<{ pointerSize: number }>(el, ctx, {
    initial: { pointerSize: 12 },
    render: ({ pointerSize }, { width, height, preview }) =>
      Plot.plot({
        width,
        height: height ?? 160,
        marks: [
          Plot.frame({ strokeOpacity: 0.2 }),
          ANCHORS.map((anchor) => [
            Plot.dot({ length: 1 }, { frameAnchor: anchor, fill: 'orange' }),
            // The tip's anchor says where its pointer points: the tip sits on that side of the dot.
            Plot.tip([anchor], { frameAnchor: anchor, anchor, pointerSize, fontSize: preview ? 7 : undefined }),
          ]),
        ],
      }),
    step: (_s, i) => ({ pointerSize: [12, 0, 24, 6][i % 4] ?? 12 }),
    previewMs: 1800,
    controls: (bar, live) => {
      slider(bar, 'pointerSize (px)', [0, 30, 1], live.state.pointerSize, (pointerSize) => live.set({ pointerSize }));
    },
  });

export default mount;
