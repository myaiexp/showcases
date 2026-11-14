// Venn marks: circle style, overlap path style and the two label kinds
import { registerVennChart } from '@visactor/vchart';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

let registered = false;
const LOOKS = ['highlighted', 'plain', 'dashed'];

const mount: Mount = (el, ctx) => {
  if (!registered) {
    registered = true;
    registerVennChart();
  }
  return mountLive<{ look: string }>(el, ctx, {
    initial: { look: 'highlighted' },
    previewMs: 1500,
    step: (s) => ({ look: LOOKS[(LOOKS.indexOf(s.look) + 1) % LOOKS.length] as string }),
    build: (s, preview) =>
      ({
        type: 'venn',
        data: [
          {
            id: 'sets',
            values: [
              { sets: ['Mobile'], size: 18 },
              { sets: ['Web'], size: 22 },
              { sets: ['Desktop'], size: 10 },
              { sets: ['Mobile', 'Web'], size: 8 },
              { sets: ['Web', 'Desktop'], size: 4 },
            ],
          },
        ],
        categoryField: 'sets',
        valueField: 'size',
        circle: { style: { fillOpacity: 0.4, stroke: '#94a3b8', lineWidth: 1 } },
        overlap: {
          style:
            s.look === 'highlighted'
              ? { fill: '#fbbf24', fillOpacity: 0.85, stroke: '#ffffff', lineWidth: 2 }
              : s.look === 'dashed'
                ? { fill: 'transparent', stroke: '#fbbf24', lineWidth: 2, lineDash: [6, 4] }
                : { fillOpacity: 0.3 },
        },
        label: {
          visible: true,
          formatMethod: (_text: unknown, datum: { sets?: string[]; size?: number }) => `${(datum.sets ?? []).join(' + ')}\n${datum.size ?? ''}`,
          style: { fill: '#e5e7eb', fontSize: preview ? 10 : 13 },
        },
        overlapLabel: {
          visible: true,
          formatMethod: (_text: unknown, datum: { sets?: string[]; size?: number }) => `${datum.size ?? ''}`,
          style: { fill: '#0f172a', fontWeight: 'bold', fontSize: preview ? 11 : 14 },
        },
        legends: { visible: false },
      }) as never,
    controls: (bar, live) => {
      select(bar, 'overlap style', LOOKS, (v) => live.set({ look: v }));
    },
  });
};

export default mount;
