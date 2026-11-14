// FAQ: line.style.stroke and lineDash as callbacks give one line several colours
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { slider } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { seeded } from '../../shared/concepts-data.ts';

const rand = seeded(2);
const series = Array.from({ length: 12 }, (_, i) => ({ x: `W${i + 1}`, y: Math.round(30 + i * 3 + rand() * 12) }));

interface S {
  forecast: number;
}

const mount: Mount = (el, ctx) =>
  mountLive<S>(el, ctx, {
    initial: { forecast: 4 },
    previewMs: 1000,
    step: (s) => ({ forecast: s.forecast >= 8 ? 1 : s.forecast + 1 }),
    controls: (bar, live) => {
      slider(bar, 'forecast points', [0, 11, 1], live.state.forecast, (v) => live.set({ forecast: v }));
    },
    build: (s): ISpec => {
      const values = series.map((d, i) => ({ ...d, forecast: i >= series.length - s.forecast }));
      return {
        type: 'line',
        data: [{ id: 'sales', values }],
        xField: 'x',
        yField: 'y',
        line: {
          style: {
            // A segment takes the style of the datum it ends on.
            stroke: (d: { forecast: boolean }) => (d.forecast ? '#ff7875' : '#69b1ff'),
            lineDash: (d: { forecast: boolean }) => (d.forecast ? [6, 6] : [0]),
          },
        },
        point: { style: { fill: (d: { forecast: boolean }) => (d.forecast ? '#ff7875' : '#69b1ff') } },
      } as unknown as ISpec;
    },
  });

export default mount;
