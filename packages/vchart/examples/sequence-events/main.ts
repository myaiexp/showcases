// Sequence chart: dot series for events, link series for the relations between them
import type { Mount } from '@/types.ts';
import { createChart, every } from '../../shared/chart.ts';
import { asSpec, fit, frame, dotLinkSeries, timeAxis, trace } from '../../shared/sequence-data.ts';

const mount: Mount = (el, ctx) => {
  const { rows, links } = fit(trace(), ctx.preview);
  const { vchart, release } = createChart(el, ctx, asSpec({
    type: 'sequence',
    // Padding keeps the row titles clear of the grid lines.
    ...frame(ctx.preview),
    series: dotLinkSeries({}, ctx.preview),
    axes: [timeAxis()],
    data: [
      { id: 'dots', values: rows },
      { id: 'links', values: links },
    ],
  }), { height: 330 });

  // New events and links: both datasets are replaced together.
  let seed = 6;
  let alive = true;
  const stop = every(3000, () => {
    if (!alive) return;
    const next = fit(trace(++seed), ctx.preview);
    void vchart.updateData('dots', next.rows as never);
    void vchart.updateData('links', next.links as never);
  });

  return () => {
    alive = false;
    stop();
    release();
  };
};

export default mount;
