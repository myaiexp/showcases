// FAQ: updateData(id, []) clears the marks but keeps axes and legend; release destroys the chart
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every } from '../../shared/chart.ts';
import { seeded } from '../../shared/concepts-data.ts';

const mount: Mount = (el, ctx) => {
  const rand = seeded(4);
  const rows = (): { x: string; y: number; c: string }[] =>
    ['Q1', 'Q2', 'Q3', 'Q4'].flatMap((x) => ['North', 'South'].map((c) => ({ x, c, y: Math.round(10 + rand() * 40) })));
  const { vchart, release } = createChart(el, ctx, {
    type: 'bar',
    data: [{ id: 'data', values: rows() }],
    xField: 'x',
    yField: 'y',
    seriesField: 'c',
    legends: { visible: true, orient: 'bottom' },
  });
  let alive = true;
  const clear = (): void => {
    if (alive) void vchart.updateData('data', []);
  };
  const fill = (): void => {
    if (alive) void vchart.updateData('data', rows());
  };
  let stop = (): void => {};
  if (ctx.preview) {
    let on = true;
    stop = every(1800, () => {
      on = !on;
      if (on) fill();
      else clear();
    });
  } else {
    const bar = controlBar(el);
    el.prepend(bar);
    button(bar, "updateData('data', [])", clear);
    button(bar, 'refill', fill);
  }
  return () => {
    alive = false;
    stop();
    release();
  };
};

export default mount;
