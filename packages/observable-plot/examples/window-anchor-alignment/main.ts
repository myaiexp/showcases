// Window anchor: start, middle or end alignment of each average
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const ANCHORS = ['start', 'middle', 'end'] as const;
type Anchor = (typeof ANCHORS)[number];

const mount: Mount = async (el, ctx) => {
  const sftemp = await csv('sf-temperatures.csv');
  return mountPlot<{ anchor: Anchor }>(el, ctx, {
    initial: { anchor: 'end' },
    render: ({ anchor }, { width, height }) =>
      Plot.plot({
        width,
        height,
        y: { grid: true, label: 'Temperature (°F)' },
        marks: [
          Plot.lineY(sftemp, { x: 'date', y: 'high', strokeOpacity: 0.3 }),
          Plot.lineY(sftemp, Plot.windowY({ k: 28, anchor }, { x: 'date', y: 'high' })),
        ],
      }),
    step: (_s, i) => ({ anchor: ANCHORS[i % 3] ?? 'end' }),
    previewMs: 2200,
    controls: (bar, live) => {
      select(bar, 'anchor', ANCHORS, live.state.anchor, (anchor) => live.set({ anchor }));
    },
  });
};

export default mount;
