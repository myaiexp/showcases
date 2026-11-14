// Image default size is 16 pixels: raise width to make portraits readable
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { csv, type Row } from '../../shared/data.ts';
import { portrait } from '../../shared/image-portraits.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const presidents = (await csv('us-president-favorability.csv')).map((d) => ({ ...d, portrait: portrait(d.Name) }));
  return mountPlot<{ size: number }>(el, ctx, {
    initial: { size: 16 },
    render: ({ size }, { width, height, preview }) =>
      Plot.plot({
        width,
        height,
        aspectRatio: preview ? undefined : 1,
        grid: true,
        x: { label: 'Favorable opinion (%)' },
        y: { label: 'Unfavorable opinion (%)' },
        marks: [
          Plot.ruleY([0]),
          Plot.ruleX([0]),
          Plot.image(presidents, {
            x: (d: Row) => d['Very Favorable %'] + d['Somewhat Favorable %'],
            y: (d: Row) => d['Very Unfavorable %'] + d['Somewhat Unfavorable %'],
            src: 'portrait',
            // width alone is enough: height defaults to the same value.
            width: size,
            title: 'Name',
          }),
        ],
      }),
    step: ({ size }) => ({ size: size >= 40 ? 16 : size + 12 }),
    controls: (bar, live) => slider(bar, 'width (pixels)', [8, 60, 2], live.state.size, (size) => live.set({ size })),
  });
};

export default mount;
