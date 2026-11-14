// Sequence link series: straight or curved links, with or without arrows
import type { Mount } from '@/types.ts';
import { button, select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { asSpec, fit, MINUTE, T0, trace } from '../../shared/sequence-data.ts';

type S = { linkType: string; arrows: boolean };
const STEPS: S[] = [
  { linkType: 'line', arrows: true },
  { linkType: 'curve', arrows: true },
  { linkType: 'curve', arrows: false },
  { linkType: 'line', arrows: false },
];
const full = trace();

const mount: Mount = (el, ctx) =>
  mountLive<S>(el, ctx, {
    initial: STEPS[0] as S,
    mode: 'rebuild',
    chart: { height: 330 },
    build: ({ linkType, arrows }, preview) => {
      const { rows, links } = fit(full, preview);
      return asSpec({
        type: 'sequence',
        // Padding keeps the row titles clear of the grid lines; no scroll bar in a card.
        appendPadding: { left: preview ? 70 : 100, right: 20 },
        ...(preview ? { scrollBar: [{ visible: false }] } : {}),
        series: [
          {
            type: 'link',
            dataId: 'links',
            dotSeriesIndex: 1,
            fromField: 'from',
            toField: 'to',
            dotTypeField: 'link_type',
            linkType,
            arrow: { style: { visible: arrows } },
            link: { style: { lineWidth: 2 } },
          },
          {
            type: 'dot',
            dataId: 'dots',
            xField: 'event_time',
            yField: 'service',
            titleField: 'service',
            dotTypeField: 'event_type',
            highLightSeriesGroup: '',
            height: preview ? 70 : 200,
            clipHeight: 400,
            title: { style: { fill: '#ddd', fontSize: preview ? 9 : 12 } },
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
      });
    },
    controls: (bar, live) => {
      select(bar, 'linkType', ['line', 'curve'], (v) => live.set({ linkType: v }));
      button(bar, 'toggle arrows', () => live.set({ arrows: !live.state.arrows }));
    },
    step: (_s, i) => STEPS[i % STEPS.length] as S,
    previewMs: 1800,
  });

export default mount;
