// Sequence dot series: highlight one group of event rows
import type { Mount } from '@/types.ts';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { asSpec, fit, MINUTE, T0, trace } from '../../shared/sequence-data.ts';

const GROUPS = ['edge', 'core', 'none'] as const;
const GROUP_OF: Record<string, string> = { gateway: 'edge', auth: 'edge' };
// Each row carries a group in its type field; the dot series reads it as seriesGroupField.
const full = trace();
const grouped = full.rows.map((r) => ({ ...r, type: GROUP_OF[r.service] ?? 'core' }));

const mount: Mount = (el, ctx) =>
  mountLive<{ group: string }>(el, ctx, {
    initial: { group: 'edge' },
    mode: 'rebuild',
    chart: { height: 330 },
    build: ({ group }, preview) => {
      const { rows, links } = fit({ rows: grouped, links: full.links }, preview);
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
            height: preview ? 70 : 200,
            clipHeight: 400,
            title: { style: { fill: '#ddd', fontSize: preview ? 9 : 12 } },
            subTitle: { visible: false, style: {} },
            // The symbol is the row marker drawn beside the title.
            symbol: { style: { dx: -20 } },
            grid: { background: { fill: '#4f8cff', fillOpacity: 0.25 }, style: { stroke: '#555' } },
            seriesGroupField: 'type',
            highLightSeriesGroup: group === 'none' ? '' : group,
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
      select(bar, 'highLightSeriesGroup', GROUPS, (v) => live.set({ group: v }));
    },
    step: (_s, i) => ({ group: GROUPS[i % GROUPS.length] as string }),
    previewMs: 1800,
  });

export default mount;
