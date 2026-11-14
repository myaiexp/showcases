// animationNormal.bar.custom: StreamLight draws a moving streak over every bar
import type { Mount } from '@/types.ts';
import { StreamLight } from '@visactor/vchart';
import { mountReplay } from '../../shared/anim-data.ts';
import { select, slider } from '../../shared/chart.ts';

interface State {
  color: string;
  width: number;
}

const rows = [
  { x: 283, y: 'a', t: 'A' }, { x: 191, y: 'b', t: 'A' }, { x: 280, y: 'c', t: 'A' }, { x: 79, y: 'd', t: 'A' },
  { x: 255, y: 'a', t: 'B' }, { x: 213, y: 'b', t: 'B' }, { x: 285, y: 'c', t: 'B' }, { x: 263, y: 'd', t: 'B' },
];

const mount: Mount = (el, ctx) =>
  mountReplay<State>(el, ctx, {
    initial: { color: 'white', width: 24 },
    period: 600000,
    build: ({ color, width }) => ({
      type: 'bar',
      direction: 'horizontal',
      data: [{ id: 'bars', values: rows }],
      xField: 'x',
      yField: ['y', 't'],
      seriesField: 't',
      axes: [{ orient: 'left', type: 'band' }, { orient: 'bottom', type: 'linear' }],
      legends: { visible: false },
      animationNormal: {
        bar: {
          loop: true,
          duration: 1500,
          easing: 'quadIn',
          custom: StreamLight,
          customParameters: { attribute: { fillColor: color, opacity: 0.6, blur: 5, shadowColor: color, width } },
        },
      },
    }),
    controls: (bar, set) => {
      select(bar, 'colour', ['white', '#ffd93d', '#53e0ff', '#ff6b6b'], (color) => set({ color }));
      slider(bar, 'width', [6, 60, 2], 24, (width) => set({ width }));
    },
  });

export default mount;
