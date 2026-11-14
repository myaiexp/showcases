// Sequence chart with two bar series, a dot series, a link series and one shared dataZoom
import type { Mount } from '@/types.ts';
import { createChart, every } from '../../shared/chart.ts';
import { asSpec, fit, frame, buckets, dotLinkSeries, MINUTE, T0, timeAxis, trace } from '../../shared/sequence-data.ts';

const bar = (title: string, dataId: string, preview: boolean): object => ({
  type: 'bar',
  barTitle: title,
  dataId,
  xField: 'start_time',
  x2Field: 'end_time',
  yField: 'value',
  animation: false,
  label: { visible: false },
  height: preview ? 14 : 36,
  padding: preview ? 4 : 8,
});

const mount: Mount = (el, ctx) => {
  const { rows, links } = fit(trace(), ctx.preview, 2);
  // Series order matters: bars, the dot series, then the link series that points at the dot series (index 2).
  const [link, dot] = dotLinkSeries({ link: { dotSeriesIndex: 2 }, dot: { height: ctx.preview ? 45 : 170 } }, ctx.preview) as object[];
  const { vchart, release } = createChart(el, ctx, asSpec({
    type: 'sequence',
    ...frame(ctx.preview),
    series: [bar('requests', 'requests', ctx.preview), bar('errors', 'errors', ctx.preview), dot, link],
    axes: [timeAxis()],
    // Region 0 is the axis row; the bars and the dot series take regions 1 to 3.
    // The card skips the zoom bar to leave the rows room.
    ...(ctx.preview ? {} : { dataZoom: [{ orient: 'top', xAxisIndex: 0, regionIndex: [1, 2, 3], start: 0.1, endValue: T0 + 50 * MINUTE, startText: { formatMethod: () => '' }, endText: { formatMethod: () => '' } }] }),
    data: [
      { id: 'requests', values: buckets(1, 12) },
      { id: 'errors', values: buckets(2, 3) },
      { id: 'dots', values: rows },
      { id: 'links', values: links },
    ],
  }), { height: 420 });

  // Card: the bars get new counts; the full view has the dataZoom to play with.
  let seed = 1;
  let alive = true;
  const stop = every(2500, () => {
    if (!alive) return;
    seed++;
    void vchart.updateData('requests', buckets(seed, 12) as never);
    void vchart.updateData('errors', buckets(seed + 50, 3) as never);
  });

  return () => {
    alive = false;
    stop();
    release();
  };
};

export default mount;
