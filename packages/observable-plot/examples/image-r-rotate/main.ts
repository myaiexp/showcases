// Image r as a size channel and rotate as a channel: tilted, scaled portraits
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { csv, type Row } from '../../shared/data.ts';
import { portrait } from '../../shared/image-portraits.ts';
import { mountPlot } from '../../shared/plot.ts';

const net = (d: Row): number => d['Very Favorable %'] + d['Somewhat Favorable %'] - d['Very Unfavorable %'] - d['Somewhat Unfavorable %'];

const mount: Mount = async (el, ctx) => {
  const presidents = (await csv('us-president-favorability.csv')).map((d) => ({ ...d, portrait: portrait(d.Name) }));
  return mountPlot<{ tilt: number }>(el, ctx, {
    initial: { tilt: 1 },
    render: ({ tilt }, { width, height }) =>
      Plot.plot({
        width,
        height,
        inset: 24,
        x: { label: 'First inauguration date' },
        y: { grid: true, label: 'Net favorability (%)', tickFormat: '+f' },
        r: { range: [6, 22] },
        marks: [
          Plot.ruleY([0]),
          Plot.image(presidents, {
            x: 'First Inauguration Date',
            y: net,
            src: 'portrait',
            r: (d: Row) => d['Don’t know %'], // size by how many have no opinion
            rotate: (d: Row) => -net(d) * tilt, // turn each portrait with its net favorability
            preserveAspectRatio: 'xMidYMin slice',
            title: 'Name',
          }),
        ],
      }),
    step: (_s, i) => ({ tilt: [1, 0, 2, 0.5][i % 4] }),
    controls: (bar, live) => slider(bar, 'rotation per point', [0, 3, 0.1], live.state.tilt, (tilt) => live.set({ tilt })),
  });
};

export default mount;
