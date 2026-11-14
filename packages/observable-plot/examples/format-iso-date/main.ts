// Plot.formatIsoDate as the text of date labels: the shortest ISO string
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const rows = (await csv('aapl.csv')).slice(-12);
  // Midnight dates print as 2018-02-14; a date with a time keeps its time part.
  const dates = rows.map((d, i) => (i % 4 === 3 ? new Date(d.Date.getTime() + 13.5 * 3600e3) : d.Date) as Date);
  return mountPlot<{ iso: boolean }>(el, ctx, {
    initial: { iso: true },
    render: ({ iso }, { width, height, preview }) =>
      Plot.plot({
        width,
        height,
        marginLeft: 10,
        marginRight: 20,
        x: { axis: null },
        y: { axis: null, reverse: true },
        marks: [
          Plot.text(dates, {
            y: (_d, i) => i,
            frameAnchor: 'left',
            text: iso ? (d: Date) => Plot.formatIsoDate(d) : (d: Date) => String(d),
            fontSize: preview ? 9 : 12,
            textAnchor: 'start',
          }),
        ],
      }),
    step: ({ iso }) => ({ iso: !iso }),
    previewMs: 2200,
    controls: (bar, live) => {
      toggle(bar, 'formatIsoDate (off = String(date))', live.state.iso, (iso) => live.set({ iso }));
    },
  });
};

export default mount;
