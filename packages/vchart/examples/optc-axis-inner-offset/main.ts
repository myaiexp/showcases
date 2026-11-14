// innerOffset: blank space inside the axes so symbols on the extreme values are not cut off
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

const POINTS = [
  { x: 0, y: 0 }, { x: 100, y: 100 }, { x: 0, y: 100 }, { x: 100, y: 0 },
  { x: 50, y: 50 }, { x: 25, y: 70 }, { x: 75, y: 30 },
];

interface S { inset: number }

const mount: Mount = (el, ctx) =>
  mountLive<S>(el, ctx, {
    initial: { inset: 0 },
    previewMs: 1200,
    step: (s) => ({ inset: s.inset >= 24 ? 0 : s.inset + 12 }),
    build: (s) => ({
      type: 'scatter',
      data: [{ id: 'd', values: POINTS }],
      xField: 'x',
      yField: 'y',
      point: { style: { size: 22, fill: '#fbbf24' } },
      axes: [
        // Bottom axes take left and right; left axes take top and bottom.
        { orient: 'bottom', type: 'linear', min: 0, max: 100, nice: false, innerOffset: { left: s.inset, right: s.inset } },
        { orient: 'left', type: 'linear', min: 0, max: 100, nice: false, innerOffset: { top: s.inset, bottom: s.inset } },
      ],
    }),
    controls: (bar, live) => {
      slider(bar, 'innerOffset (px)', [0, 40, 2], live.state.inset, (v) => live.set({ inset: v }));
    },
  });

export default mount;
