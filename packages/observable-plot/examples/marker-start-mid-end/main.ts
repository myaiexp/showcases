// markerStart, markerMid and markerEnd set separately on a line
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const MARKERS = ['none', 'arrow', 'arrow-reverse', 'dot', 'circle', 'circle-stroke', 'tick', 'tick-x', 'tick-y'] as const;
type MarkerName = (typeof MARKERS)[number];

const mount: Mount = async (el, ctx) => {
  const aapl = (await csv('aapl.csv')).slice(-30);
  return mountPlot<{ start: MarkerName; mid: MarkerName; end: MarkerName }>(el, ctx, {
    initial: { start: 'circle-stroke', mid: 'dot', end: 'arrow' },
    render: ({ start, mid, end }, { width, height, preview }) =>
      Plot.plot({
        width,
        height,
        marginTop: 24,
        title: preview ? `start ${start}, mid ${mid}, end ${end}` : undefined,
        y: { grid: true },
        marks: [Plot.lineY(aapl, { x: 'Date', y: 'Close', stroke: 'steelblue', strokeWidth: 1.5, markerStart: start, markerMid: mid, markerEnd: end })],
      }),
    step: (_s, i) => ({ start: MARKERS[i % 9], mid: MARKERS[(i * 2 + 3) % 9], end: MARKERS[(i * 4 + 1) % 9] }),
    previewMs: 1700,
    controls: (bar, live) => {
      select(bar, 'markerStart', MARKERS, live.state.start, (start) => live.set({ start }));
      select(bar, 'markerMid', MARKERS, live.state.mid, (mid) => live.set({ mid }));
      select(bar, 'markerEnd', MARKERS, live.state.end, (end) => live.set({ end }));
    },
  });
};

export default mount;
