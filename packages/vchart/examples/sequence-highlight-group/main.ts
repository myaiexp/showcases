// Sequence dot series: highlight one group of event rows
import type { Mount } from '@/types.ts';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { asSpec, fit, frame, dotLinkSeries, timeAxis, trace } from '../../shared/sequence-data.ts';

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
        ...frame(preview),
        series: dotLinkSeries({
          dot: {
            seriesGroupField: 'type',
            highLightSeriesGroup: group === 'none' ? '' : group,
            grid: { background: { fill: '#4f8cff', fillOpacity: 0.25 }, style: { stroke: '#555' } },
          },
        }, preview),
        axes: [timeAxis()],
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
