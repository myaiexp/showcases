// Rule: marker "tick" caps a rule, here as a plus-or-minus 10% error bar
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const MARKERS = ['tick', 'dot', 'arrow', 'circle-stroke'] as const;

const mount: Mount = async (el, ctx) => {
  const alphabet = await csv('alphabet.csv');
  return mountPlot<{ marker: (typeof MARKERS)[number] }>(el, ctx, {
    initial: { marker: 'tick' },
    render: ({ marker }, { width, height }) =>
      Plot.plot({
        width,
        height,
        x: { label: null },
        y: { percent: true },
        marks: [
          Plot.barY(alphabet, { x: 'letter', y: 'frequency', fill: 'blue' }),
          Plot.ruleX(alphabet, { x: 'letter', y1: (d) => d.frequency * 0.9, y2: (d) => d.frequency * 1.1, marker }),
          Plot.ruleY([0]),
        ],
      }),
    step: ({ marker }, i) => ({ marker: MARKERS[i % MARKERS.length] ?? marker }),
    controls: (bar, live) => {
      select(bar, 'marker', MARKERS, live.state.marker, (marker) => live.set({ marker }));
    },
  });
};

export default mount;
