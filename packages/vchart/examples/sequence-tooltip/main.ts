// Sequence tooltips: custom title and content for events (dot series) and relations (link series)
import type { Mount } from '@/types.ts';
import { createChart, every, readout } from '../../shared/chart.ts';
import { asSpec, fit, MINUTE, T0, trace } from '../../shared/sequence-data.ts';

type D = Record<string, string | number>;
const hhmm = (t: number): string => new Date(t).toISOString().slice(11, 16);

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
        tooltip: {
          mark: {
            title: { key: 'relation', value: (d: D) => String(d.link_type) },
            content: [
              { hasShape: true, shapeType: 'square', key: 'from', value: (d: D) => d.from },
              { hasShape: true, shapeType: 'square', key: 'to', value: (d: D) => d.to },
            ],
          },
        },
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
        tooltip: {
          mark: {
            title: { key: 'event', value: (d: D) => String(d.event_type) },
            content: [
              { hasShape: true, shapeType: 'square', key: 'service', value: (d: D) => d.service },
              { hasShape: false, key: 'time', value: (d: D) => hhmm(Number(d.event_time)) },
              { hasShape: false, key: 'node', value: (d: D) => d.node_name },
            ],
          },
        },
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

  const out = ctx.preview ? null : readout(el);
  if (out) out.textContent = 'Hover an event dot or a link: each series shows its own tooltip title and content.';

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
