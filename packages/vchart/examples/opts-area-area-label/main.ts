// areaLabel: one label per area, anchored at its start or end
import type { Mount } from '@/types.ts';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { groupedRows } from '../../shared/components-data.ts';

interface S { position: string; stack: boolean }

const mount: Mount = (el, ctx) =>
  mountLive<S>(el, ctx, {
    initial: { position: 'end', stack: true },
    previewMs: 1600,
    step: (s, i) => ({ position: i % 2 ? 'start' : 'end', stack: i % 4 < 2 }),
    build: (s) =>
      ({
        type: 'area',
        stack: s.stack,
        data: [{ id: 'd', values: groupedRows(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], ['Alpha', 'Beta', 'Gamma'], 12) }],
        xField: 'x',
        yField: 'y',
        seriesField: 'c',
        line: { style: { lineWidth: 2 } },
        area: { style: { fillOpacity: 0.45 } },
        legends: { visible: false },
        areaLabel: {
          visible: true,
          position: s.position,
          offset: 6,
          formatMethod: (_text: unknown, datum: { c?: string }) => datum.c ?? '',
          style: { fill: '#e5e7eb', fontSize: 13, fontWeight: 'bold' },
        },
        axes: [{ orient: 'left', type: 'linear' }, { orient: 'bottom', type: 'band' }],
      }) as never,
    controls: (bar, live) => {
      select(bar, 'areaLabel.position', ['end', 'start'], (v) => live.set({ position: v }));
      select(bar, 'stack', ['true', 'false'], (v) => live.set({ stack: v === 'true' }));
    },
  });

export default mount;
