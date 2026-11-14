// funnel label.limit and transformLabel.limit: truncating text to a width or to the layer shape
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

const ROWS = [
  { name: 'Visited the marketing site', value: 1000 },
  { name: 'Started a free trial of the product', value: 620 },
  { name: 'Invited teammates to the workspace', value: 340 },
  { name: 'Upgraded to a paid plan', value: 160 },
  { name: 'Renewed after the first year', value: 90 },
];

const mount: Mount = (el, ctx) =>
  mountLive<{ mode: string; limit: number }>(el, ctx, {
    initial: { mode: 'number', limit: 120 },
    previewMs: 1500,
    step: (s, i) => ({ mode: i % 4 === 3 ? 'shapeSize' : 'number', limit: [60, 120, 200][i % 3] as number }),
    build: (s, preview) =>
      ({
        type: 'funnel',
        data: [{ id: 'd', values: ROWS }],
        categoryField: 'name',
        valueField: 'value',
        isTransform: true,
        legends: { visible: false },
        label: { visible: true, limit: s.mode === 'shapeSize' ? 'shapeSize' : s.limit, style: { fontSize: preview ? 10 : 12, fill: '#0f172a' } },
        transformLabel: { visible: true, limit: s.mode === 'shapeSize' ? 'shapeSize' : 60, style: { fontSize: preview ? 9 : 11 } },
      }) as never,
    controls: (bar, live) => {
      select(bar, 'limit mode', ['number', 'shapeSize'], (v) => live.set({ mode: v }));
      slider(bar, 'label.limit (px)', [30, 300, 10], live.state.limit, (v) => live.set({ limit: v }));
    },
  });

export default mount;
