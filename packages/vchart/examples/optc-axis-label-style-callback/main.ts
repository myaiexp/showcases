// Axis label style as a callback: (value, index) returns the style of that one label
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { DAYS } from '../../shared/cartesian-data.ts';

const VALUES = [42, 55, 38, 61, 47, 72, 66];

const mount: Mount = (el, ctx) =>
  mountLive(el, ctx, {
    initial: { hot: 2 },
    previewMs: 1000,
    step: (s) => ({ hot: (s.hot + 1) % DAYS.length }),
    build: (s) => ({
      type: 'bar',
      data: [{ id: 'd', values: DAYS.map((day, i) => ({ day, value: VALUES[i] })) }],
      xField: 'day',
      yField: 'value',
      axes: [
        {
          orient: 'bottom',
          label: {
            // value is the label text, index its position (axis-label.md § style).
            style: (value: string, index: number) =>
              index === s.hot
                ? { fill: '#fbbf24', fontWeight: 'bold', fontSize: 16 }
                : value === 'Sat' || value === 'Sun'
                  ? { fill: '#7dd3fc' }
                  : { fill: '#9aa3b2' },
          },
        },
        { orient: 'left' },
      ],
    }),
    controls: (bar, live) => {
      slider(bar, 'highlight index', [0, 6, 1], live.state.hot, (v) => live.set({ hot: v }));
    },
  });

export default mount;
