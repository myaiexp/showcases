// A venn chart: circles from single-set rows, overlaps from multi-set rows
import { registerVennChart } from '@visactor/vchart';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

let registered = false;

const mount: Mount = (el, ctx) => {
  if (!registered) {
    registered = true;
    registerVennChart();
  }
  return mountLive<{ ab: number }>(el, ctx, {
    initial: { ab: 6 },
    previewMs: 1500,
    step: (s) => ({ ab: s.ab >= 14 ? 2 : s.ab + 4 }),
    build: (s, preview) =>
      ({
        type: 'venn',
        data: [
          {
            id: 'sets',
            values: [
              { sets: ['Design'], size: 20 },
              { sets: ['Code'], size: 24 },
              { sets: ['Data'], size: 14 },
              { sets: ['Design', 'Code'], size: s.ab },
              { sets: ['Code', 'Data'], size: 5 },
              { sets: ['Design', 'Data'], size: 3 },
            ],
          },
        ],
        // The series reads sets (categoryField) and size (valueField) from each row.
        categoryField: 'sets',
        valueField: 'size',
        label: { visible: true, style: { fill: '#e5e7eb', fontSize: preview ? 11 : 14, fontWeight: 'bold' } },
        overlapLabel: { visible: !preview, style: { fill: '#0f172a', fontSize: 12 } },
        circle: { style: { fillOpacity: 0.55 } },
        legends: { visible: false },
      }) as never,
    controls: (bar, live) => {
      slider(bar, 'Design ∩ Code size', [1, 18, 1], live.state.ab, (v) => live.set({ ab: v }));
    },
  });
};

export default mount;
