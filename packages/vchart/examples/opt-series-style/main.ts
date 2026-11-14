// seriesStyle: a per-group style override keyed by the seriesField value
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select } from '../../shared/chart.ts';
import { groupedRows } from '../../shared/components-data.ts';
import { mountLive } from '../../shared/live-spec.ts';

const GROUPS = ['North', 'South', 'East', 'West'];
const rows = groupedRows(['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6'], GROUPS, 8);

const mount: Mount = (el, ctx) =>
  mountLive<{ name: string }>(el, ctx, {
    initial: { name: 'East' },
    mode: 'rebuild',
    previewMs: 1300,
    step: (_s, i) => ({ name: GROUPS[i % GROUPS.length] ?? 'North' }),
    build: ({ name }, preview) =>
      ({
        type: 'line',
        data: [{ id: 'd', values: rows }],
        xField: 'x',
        yField: 'y',
        seriesField: 'c',
        legends: { visible: !preview },
        // Each entry names a seriesField value and then a mark name (line, point) with its own style.
        seriesStyle: [
          {
            name,
            line: { style: { stroke: '#ff8a3d', lineWidth: 6, lineDash: [10, 5] } },
            point: { style: { fill: '#ff8a3d', size: 14, stroke: '#ffffff', lineWidth: 2 } },
          },
        ],
      }) as unknown as ISpec,
    controls: (bar, live) => {
      select(bar, 'seriesStyle name', GROUPS, (v) => live.set({ name: v })).value = 'East';
    },
  });

export default mount;
