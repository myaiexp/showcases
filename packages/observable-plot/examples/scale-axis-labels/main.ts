// Axis labels: labelAnchor, labelArrow and labelOffset
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const xAnchors = ['left', 'center', 'right'] as const;
const yAnchors = ['top', 'center', 'bottom'] as const;
const arrows = ['auto', 'up', 'right', 'down', 'left', 'none'] as const;
interface State {
  xAnchor: (typeof xAnchors)[number];
  yAnchor: (typeof yAnchors)[number];
  arrow: (typeof arrows)[number];
  offset: number;
}

const mount: Mount = async (el, ctx) => {
  const gistemp = await csv('gistemp.csv');
  return mountPlot<State>(el, ctx, {
    initial: { xAnchor: 'right', yAnchor: 'top', arrow: 'auto', offset: 30 },
    render: ({ xAnchor, yAnchor, arrow, offset }, { width, height }) =>
      Plot.plot({
        width,
        height,
        marginLeft: 50,
        x: { label: 'Year', labelAnchor: xAnchor, labelArrow: arrow, labelOffset: offset },
        y: { label: 'Temperature anomaly (°C)', labelAnchor: yAnchor, labelArrow: arrow, labelOffset: offset },
        marks: [Plot.lineY(gistemp, { x: 'Date', y: 'Anomaly' })],
      }),
    step: (_s, i) => ({ xAnchor: xAnchors[i % 3], yAnchor: yAnchors[i % 3], arrow: arrows[i % 6], offset: 30 }),
    previewMs: 1800,
    controls: (bar, live) => {
      select(bar, 'x labelAnchor ', xAnchors, live.state.xAnchor, (xAnchor) => live.set({ xAnchor }));
      select(bar, 'y labelAnchor ', yAnchors, live.state.yAnchor, (yAnchor) => live.set({ yAnchor }));
      select(bar, 'labelArrow ', arrows, live.state.arrow, (arrow) => live.set({ arrow }));
      slider(bar, 'labelOffset ', [0, 60, 1], live.state.offset, (offset) => live.set({ offset }));
    },
  });
};

export default mount;
