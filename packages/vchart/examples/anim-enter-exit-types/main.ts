// animationEnter/animationExit with type: 'scaleIn' and a chosen exit type
import type { Mount } from '@/types.ts';
import { randomCategories } from '../../shared/anim-data.ts';
import { controlBar, createChart, every, select } from '../../shared/chart.ts';

const mount: Mount = (el, ctx) => {
  let exitType = 'fadeOut';
  const spec = () => ({
    type: 'bar' as const,
    data: [{ id: 'trees', values: randomCategories(40, 3, 7) }],
    xField: 'name',
    yField: 'value',
    seriesField: 'name',
    legends: { visible: false },
    animationEnter: { bar: { type: 'scaleIn', options: { direction: 'y' }, duration: 700, easing: 'backOut' } },
    animationExit: { bar: { type: exitType, options: { direction: 'y' }, duration: 700 } },
  });
  if (!ctx.preview) {
    select(controlBar(el), 'exit type', ['fadeOut', 'scaleOut', 'moveOut', 'growHeightOut', 'growCenterOut'], (v) => {
      exitType = v;
      void chart.vchart.updateSpec(spec());
    });
  }
  const chart = createChart(el, ctx, spec());
  let i = 40;
  let alive = true;
  const stop = every(2400, () => {
    if (alive) void chart.vchart.updateData('trees', randomCategories(++i, 3, 7));
  });
  return () => {
    alive = false;
    stop();
    chart.release();
  };
};

export default mount;
