// Radar quick start: categoryField places the vertices on the angle axis, area fills the shape
import type { Mount } from '@/types.ts';
import { createChart, every } from '../../shared/chart.ts';
import { rng } from '../../shared/polar-data.ts';

const KEYS = ['Power', 'Speed', 'Range', 'Stamina', 'Precision', 'Growth'];
const rows = (r: () => number): { key: string; value: number }[] => KEYS.map((key) => ({ key, value: 1 + Math.round(r() * 4) }));

const mount: Mount = (el, ctx) => {
  const r = rng(12);
  const { vchart, release } = createChart(el, ctx, {
    type: 'radar',
    data: [{ id: 'stats', values: rows(r) }],
    categoryField: 'key',
    valueField: 'value',
    area: { visible: true },
    axes: [{ orient: 'radius', max: 5, min: 0, label: { visible: !ctx.preview } }, { orient: 'angle' }],
  });
  const stop = every(1800, () => {
    void vchart.updateData('stats', rows(r));
  });
  return () => {
    stop();
    release();
  };
};

export default mount;
