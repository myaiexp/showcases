// Text: newlines in one string render as multiple lines, centred by frameAnchor
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const POEM = `This Is Just To Say
William Carlos Williams, 1934

I have eaten
the plums
that were in
the icebox

and which
you were probably
saving
for breakfast

Forgive me
they were delicious
so sweet
and so cold`;

const ANCHORS = ['middle', 'top-left', 'bottom-right', 'right'] as const;

const mount: Mount = (el, ctx) =>
  mountPlot<{ anchor: (typeof ANCHORS)[number] }>(el, ctx, {
    initial: { anchor: 'middle' },
    render: ({ anchor }, { width, height, preview }) =>
      Plot.plot({
        width,
        height: height ?? 200,
        marks: [Plot.frame(), Plot.text([POEM], { frameAnchor: anchor, fontSize: preview ? 8 : undefined })],
      }),
    step: ({ anchor }, i) => ({ anchor: ANCHORS[i % ANCHORS.length] ?? anchor }),
    previewMs: 1800,
    controls: (bar, live) => {
      select(bar, 'frameAnchor', ANCHORS, live.state.anchor, (anchor) => live.set({ anchor }));
    },
  });

export default mount;
