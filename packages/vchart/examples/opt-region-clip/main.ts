// region[].clip: draw or cut the marks that leave the region
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select } from '../../shared/chart.ts';
import { groupedRows } from '../../shared/components-data.ts';
import { mountLive } from '../../shared/live-spec.ts';

const rows = groupedRows(['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6'], ['North'], 3).map(({ x, y }, i) => ({ x, y: y + (i % 2) * 40 }));

const mount: Mount = (el, ctx) =>
  mountLive<{ clip: boolean }>(el, ctx, {
    initial: { clip: false },
    mode: 'rebuild',
    previewMs: 1500,
    step: (s) => ({ clip: !s.clip }),
    build: ({ clip }, preview) =>
      ({
        type: 'line',
        data: [{ id: 'd', values: rows }],
        xField: 'x',
        yField: 'y',
        legends: { visible: false },
        // The value axis stops at 60, so the line leaves the region wherever the data is higher.
        axes: [{ orient: 'left', type: 'linear', min: 0, max: 60 }, { orient: 'bottom', type: 'band' }],
        region: [{ clip, style: { fill: '#1d2a52', fillOpacity: 0.6 } }],
        line: { style: { lineWidth: 5, stroke: '#ff8a3d' } },
        point: { style: { size: 10, fill: '#ffd93d' } },
        title: preview ? undefined : { visible: true, text: `region.clip: ${clip}`, textStyle: { fontSize: 13 } },
        tooltip: { visible: false },
      }) as unknown as ISpec,
    controls: (bar, live) => {
      select(bar, 'region.clip', ['false', 'true'], (v) => live.set({ clip: v === 'true' }));
    },
  });

export default mount;
