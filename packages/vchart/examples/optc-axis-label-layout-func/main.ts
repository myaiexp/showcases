// label.dataFilter and layoutFunc: custom choice and placement of band-axis labels
import type { Mount } from '@/types.ts';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { seeded } from '../../shared/cartesian-data.ts';

const rand = seeded(12);
const ROWS = Array.from({ length: 16 }, (_, i) => ({ name: `Station ${i + 1}`, value: Math.round(20 + rand() * 70) }));

interface S { mode: string }

const mount: Mount = (el, ctx) =>
  mountLive<S>(el, ctx, {
    initial: { mode: 'stagger' },
    previewMs: 1800,
    step: (s) => ({ mode: s.mode === 'stagger' ? 'every 2nd' : 'stagger' }),
    build: (s) => ({
      type: 'bar',
      data: [{ id: 'd', values: ROWS }],
      xField: 'name',
      yField: 'value',
      axes: [
        {
          orient: 'bottom',
          sampling: false,
          label: {
            style: { fontSize: 11 },
            // dataFilter drops every second label when asked to (axis-label.md § dataFilter).
            dataFilter: (data: { index: number }[]) => (s.mode === 'every 2nd' ? data.filter((d) => d.index % 2 === 0) : data),
            // layoutFunc replaces the default anti-overlap rules (cartesian-axis.md § layoutFunc).
            layoutFunc: (labels: { setAttributes(a: object): void }[]) => {
              labels.forEach((t, i) => {
                t.setAttributes({ angle: 0, dy: s.mode === 'stagger' && i % 2 ? 14 : 0, textAlign: 'center' });
              });
            },
          },
        },
        { orient: 'left' },
      ],
    }),
    controls: (bar, live) => {
      select(bar, 'labels', ['stagger', 'every 2nd'], (v) => live.set({ mode: v }));
    },
  });

export default mount;
