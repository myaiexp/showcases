// large and largeThreshold on a scatter series
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/chart.ts';
import { mountProgressive } from '../../shared/progressive-data.ts';
import { rng } from '../../shared/components-data.ts';

interface State {
  points: number;
  large: boolean;
  largeThreshold: number;
}

function cloud(n: number): { x: number; y: number }[] {
  const r = rng(5);
  return Array.from({ length: n }, () => {
    const a = r() * Math.PI * 2;
    const d = Math.sqrt(r()) * 50;
    return { x: Math.round((50 + Math.cos(a) * d) * 10) / 10, y: Math.round((50 + Math.sin(a) * d * 0.7) * 10) / 10 };
  });
}

const mount: Mount = (el, ctx) =>
  mountProgressive<State>(el, ctx, {
    initial: { points: ctx.preview ? 2000 : 8000, large: true, largeThreshold: 1000 },
    build: (s) =>
      ({
        type: 'scatter',
        data: [{ id: 'cloud', values: cloud(s.points) }],
        xField: 'x',
        yField: 'y',
        // `large` switches the optimisation on once the data is longer than largeThreshold.
        large: s.large,
        largeThreshold: s.largeThreshold,
        point: { style: { size: 4, fillOpacity: 0.7 } },
        tooltip: { visible: false },
        animation: false,
      }) as never,
    controls(bar, state, set) {
      select(bar, 'large', ['true', 'false'], (v) => set({ large: v === 'true' }));
      slider(bar, 'points', [500, 40000, 500], state.points, (points) => set({ points }));
      slider(bar, 'largeThreshold', [200, 10000, 200], state.largeThreshold, (largeThreshold) => set({ largeThreshold }));
    },
    step: (s) => ({ large: !s.large }),
    previewMs: 2200,
  });

export default mount;
