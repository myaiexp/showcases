// Legend title (with background) and the legend background panel
import type { Mount } from '@/types.ts';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { GROUPS, groupedRows } from '../../shared/components-data.ts';

interface S { align: string; panel: boolean }

const mount: Mount = (el, ctx) =>
  mountLive<S>(el, ctx, {
    initial: { align: 'start', panel: true },
    previewMs: 1400,
    step: (s, i) => ({ align: ['start', 'center', 'end'][i % 3] as string, panel: i % 4 !== 3 }),
    build: (s) => ({
      type: 'bar',
      data: [{ id: 'd', values: groupedRows(['Q1', 'Q2', 'Q3'], GROUPS, 3) }],
      xField: ['x', 'c'],
      yField: 'y',
      seriesField: 'c',
      legends: {
        visible: true,
        orient: 'right',
        title: {
          visible: true,
          text: 'Region',
          align: s.align as 'start',
          space: 8,
          textStyle: { fill: '#fbbf24', fontWeight: 'bold' },
          background: { visible: true, style: { fill: 'rgba(251,191,36,0.15)', cornerRadius: 4 } },
        },
        background: { visible: s.panel, padding: 10, style: { fill: 'rgba(255,255,255,0.06)', stroke: '#8a8f9c', cornerRadius: 6 } },
      },
    }),
    controls: (bar, live) => {
      select(bar, 'title.align', ['start', 'center', 'end'], (v) => live.set({ align: v }));
      select(bar, 'background', ['true', 'false'], (v) => live.set({ panel: v === 'true' }));
    },
  });

export default mount;
