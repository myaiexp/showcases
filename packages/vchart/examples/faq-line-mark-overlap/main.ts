// FAQ: thin out crowded line points with markOverlap, pointDis and pointDisMul
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, every, select, slider } from '../../shared/chart.ts';
import { pick, rng } from '../../shared/components-data.ts';

const r = rng(77);
let y = 50;
const values = Array.from({ length: 160 }, (_, x) => ({ x, y: (y = Math.max(5, Math.min(95, y + (r() - 0.5) * 14))) }));
const MODES = ['every point', 'markOverlap: true'] as const;

const build = (mode: string, dis: number): ISpec => ({
  type: 'line',
  data: [{ id: 'd', values }],
  xField: 'x',
  yField: 'y',
  // markOverlap hides a point that would sit closer than pointDis px to the previous drawn one.
  ...(mode === MODES[1] ? { markOverlap: true, pointDis: dis, pointDisMul: 1 } : {}),
  point: { style: { size: 7 } },
  axes: [{ orient: 'bottom', type: 'linear', min: 0, max: 159 }, { orient: 'left' }],
});

const mount: Mount = (el, ctx) => {
  let mode: string = MODES[1];
  let dis = 14;
  let chart = createChart(el, ctx, build(mode, dis));
  // markOverlap is read at creation time, so every change gets a fresh chart.
  const rebuild = (): void => {
    chart.release();
    chart = createChart(el, ctx, build(mode, dis));
  };
  if (!ctx.preview) {
    const bar = controlBar(el);
    el.prepend(bar);
    select(bar, 'points', MODES, (v) => ((mode = v), rebuild())).value = mode;
    slider(bar, 'pointDis (px)', [4, 40, 2], dis, (v) => ((dis = v), rebuild()));
  }
  let i = 0;
  const stop = every(2000, () => {
    i += 1;
    if (ctx.preview) {
      mode = pick([...MODES], i);
      rebuild();
    }
  });
  return () => {
    stop();
    chart.release();
  };
};

export default mount;
