// updateData with animationEnter, animationUpdate and animationExit durations
import type { Mount } from '@/types.ts';
import { randomCategories } from '../../shared/anim-data.ts';
import { controlBar, createChart, every, slider } from '../../shared/chart.ts';

const mount: Mount = (el, ctx) => {
  const dur = { enter: 600, update: 600, exit: 600 };
  const spec = () => ({
    type: 'bar' as const,
    data: [{ id: 'trees', values: randomCategories(1) }],
    xField: 'name',
    yField: 'value',
    seriesField: 'name',
    legends: { visible: false },
    animationEnter: { duration: dur.enter, easing: 'cubicOut' as const },
    animationUpdate: { duration: dur.update, easing: 'cubicInOut' as const },
    animationExit: { duration: dur.exit, easing: 'cubicIn' as const },
  });
  if (!ctx.preview) {
    const bar = controlBar(el);
    for (const k of ['enter', 'update', 'exit'] as const) {
      slider(bar, k, [0, 2000, 100], dur[k], (v) => {
        dur[k] = v;
        void chart.vchart.updateSpec(spec());
      });
    }
  }
  const chart = createChart(el, ctx, spec());
  let i = 1;
  let alive = true;
  const stop = every(ctx.preview ? 2200 : 2600, () => {
    if (alive) void chart.vchart.updateData('trees', randomCategories(++i));
  });
  return () => {
    alive = false;
    stop();
    chart.release();
  };
};

export default mount;
