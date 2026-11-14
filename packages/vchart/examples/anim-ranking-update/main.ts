// animationUpdate split by channel: slow value change, quick rank move
import type { Mount } from '@/types.ts';
import { createChart, every } from '../../shared/chart.ts';
import { rng } from '../../shared/components-data.ts';

const NAMES = ['Aster', 'Basil', 'Clove', 'Dill', 'Fennel', 'Ginger', 'Hyssop', 'Mint'];

const mount: Mount = (el, ctx) => {
  const r = rng(31);
  const scores = NAMES.map((name) => ({ name, value: Math.round(30 + r() * 60) }));
  const frame = () => {
    for (const s of scores) s.value = Math.max(5, Math.min(140, s.value + Math.round((r() - 0.35) * 30)));
    return [...scores].sort((a, b) => b.value - a.value).map((s) => ({ ...s }));
  };
  const { vchart, release } = createChart(el, ctx, {
    type: 'bar',
    direction: 'horizontal',
    data: [{ id: 'rank', values: [...scores].sort((a, b) => b.value - a.value).map((s) => ({ ...s })) }],
    yField: 'name',
    xField: 'value',
    seriesField: 'name',
    legends: { visible: false },
    label: { visible: true },
    axes: [
      { animation: true, orient: 'bottom', type: 'linear', visible: !ctx.preview, grid: { visible: true } },
      { animation: true, orient: 'left', type: 'band', tick: { visible: false } },
    ],
    animationUpdate: {
      bar: [
        { type: 'update', options: { excludeChannels: ['x', 'y'] }, duration: 1200 },
        { channel: ['x', 'y'], options: { excludeChannels: ['width'] }, duration: 500 },
      ],
      axis: { duration: 500, easing: 'linear' },
    },
  } as never);
  let alive = true;
  const stop = every(2000, () => {
    if (alive) void vchart.updateData('rank', frame());
  });
  return () => {
    alive = false;
    stop();
    release();
  };
};

export default mount;
