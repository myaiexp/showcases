// Crimean War deaths by cause, with a marker on every line vertex
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { crimea } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const MARKERS = ['none', 'arrow', 'arrow-reverse', 'dot', 'circle', 'circle-stroke', 'tick', 'tick-x', 'tick-y', 'true'] as const;
type MarkerName = (typeof MARKERS)[number];

const mount: Mount = async (el, ctx) => {
  const data = await crimea();
  return mountPlot<{ marker: MarkerName }>(el, ctx, {
    initial: { marker: 'circle' },
    render: ({ marker }, { width, height, preview }) =>
      Plot.plot({
        width,
        height,
        marginTop: 24,
        title: preview ? `marker: ${marker}` : undefined,
        marks: [
          Plot.ruleY([0]),
          // marker: true falls back to circle; "none" is the default.
          Plot.lineY(data, { x: 'date', y: 'deaths', stroke: 'cause', marker: marker === 'true' ? true : marker }),
        ],
      }),
    step: (_s, i) => ({ marker: MARKERS[i % MARKERS.length] }),
    previewMs: 1500,
    controls: (bar, live) => {
      select(bar, 'marker', MARKERS, live.state.marker, (marker) => live.set({ marker }));
    },
  });
};

export default mount;
