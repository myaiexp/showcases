// Sequence chart: dot series for events, link series for the relations between them
import type { Mount } from '@/types.ts';
import { createChart, every } from '../../shared/chart.ts';
import { asSpec, fit, MINUTE, T0, trace } from '../../shared/sequence-data.ts';

const mount: Mount = (el, ctx) => {
  const { rows, links } = fit(trace(), ctx.preview);
  const { vchart, release } = createChart(el, ctx, asSpec({
    type: 'sequence',
    // Padding keeps the row titles clear of the grid lines; no scroll bar in a card.
    appendPadding: { left: ctx.preview ? 70 : 100, right: 20 },
    ...(ctx.preview ? { scrollBar: [{ visible: false }] } : {}),
    series: [
      {
        type: 'link',
        dataId: 'links',
        dotSeriesIndex: 1,
        fromField: 'from',
        toField: 'to',
        dotTypeField: 'link_type',
      },
      {
        type: 'dot',
        dataId: 'dots',
        xField: 'event_time',
        yField: 'service',
        titleField: 'service',
        dotTypeField: 'event_type',
        highLightSeriesGroup: '',
        height: ctx.preview ? 70 : 200,
        clipHeight: 400,
        title: { style: { fill: '#ddd', fontSize: ctx.preview ? 9 : 12 } },
        subTitle: { visible: false, style: {} },
        // The symbol is the row marker drawn beside the title.
        symbol: { style: { dx: -20 } },
        grid: { style: { stroke: '#555' } },
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
