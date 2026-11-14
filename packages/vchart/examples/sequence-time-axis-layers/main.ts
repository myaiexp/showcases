// Sequence time axis: two label layers with their own tickStep and timeFormat
import type { Mount } from '@/types.ts';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { asSpec, fit, MINUTE, T0, trace } from '../../shared/sequence-data.ts';

const LAYERS: Record<string, { step: number; fmt: string; step2: number; fmt2: string }> = {
  '15 min / hour': { step: 15 * MINUTE, fmt: '%H:%M', step2: 60 * MINUTE, fmt2: '%Y-%m-%d' },
  '5 min / 30 min': { step: 5 * MINUTE, fmt: '%H:%M', step2: 30 * MINUTE, fmt2: '%H:%M' },
  '10 min / hour, minutes only': { step: 10 * MINUTE, fmt: ':%M', step2: 60 * MINUTE, fmt2: '%H h' },
};
const NAMES = Object.keys(LAYERS);
const full = trace();

const mount: Mount = (el, ctx) =>
  mountLive<{ name: string }>(el, ctx, {
    initial: { name: NAMES[0] as string },
    mode: 'rebuild',
    chart: { height: 330 },
    build: ({ name }, preview) => {
      const l = LAYERS[name] as { step: number; fmt: string; step2: number; fmt2: string };
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
        // Two label layers, each with its own tickStep and timeFormat.
        axes: [
          {
            orient: 'top',
            type: 'time',
            range: { min: T0 - 2 * MINUTE, max: T0 + 62 * MINUTE },
            layers: [
              { tickStep: l.step, timeFormat: l.fmt },
              { tickStep: l.step2, timeFormat: l.fmt2 },
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
      select(bar, 'layers', NAMES, (v) => live.set({ name: v }));
    },
    step: (_s, i) => ({ name: NAMES[i % NAMES.length] as string }),
    previewMs: 2000,
  });

export default mount;
