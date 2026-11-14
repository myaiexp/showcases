// Sequence chart with two bar series, a dot series, a link series and one shared dataZoom
import type { Mount } from '@/types.ts';
import { createChart, every } from '../../shared/chart.ts';
import { asSpec, fit, buckets, MINUTE, T0, trace } from '../../shared/sequence-data.ts';

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
  const { vchart, release } = createChart(el, ctx, asSpec({
    type: 'sequence',
    // Padding keeps the row titles clear of the grid lines; no scroll bar in a card.
    appendPadding: { left: ctx.preview ? 70 : 100, right: 20 },
    ...(ctx.preview ? { scrollBar: [{ visible: false }] } : {}),
    series: [
      bar('requests', 'requests', ctx.preview),
      bar('errors', 'errors', ctx.preview),
      {
        type: 'dot',
        dataId: 'dots',
        xField: 'event_time',
        yField: 'service',
        titleField: 'service',
        dotTypeField: 'event_type',
        highLightSeriesGroup: '',
        height: ctx.preview ? 45 : 170,
        clipHeight: 400,
        title: { style: { fill: '#ddd', fontSize: ctx.preview ? 9 : 12 } },
        subTitle: { visible: false, style: {} },
        // The symbol is the row marker drawn beside the title.
        symbol: { style: { dx: -20 } },
        grid: { style: { stroke: '#555' } },
      },
      {
        type: 'link',
        dataId: 'links',
        dotSeriesIndex: 2,
        fromField: 'from',
        toField: 'to',
        dotTypeField: 'link_type',
      },
    ],
    // The time-typed top axis, with two label layers.
    axes: [
      {
        orient: 'top',
        type: 'time',
        range: { min: T0 - 2 * MINUTE, max: T0 + 62 * MINUTE },
        layers: [
          { tickStep: 15 * MINUTE, timeFormat: '%H:%M' },
          { tickStep: 60 * MINUTE, timeFormat: '%Y-%m-%d' },
        ],
      },
    ],
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
