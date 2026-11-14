// animationUpdate on the bar mark with oneByOne: false | true | a number of milliseconds
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, every, select } from '../../shared/chart.ts';
import { weekdayRows } from '../../shared/anim-data.ts';

const MODES = ['false', 'true', '150'];
const DAYS12 = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];

const mount: Mount = (el, ctx) => {
  let mode = ctx.preview ? '150' : 'false';
  const oneByOne = (): boolean | number => (mode === 'true' ? true : mode === 'false' ? false : Number(mode));
  const spec = (): ISpec =>
    ({
      type: 'bar',
      data: [{ id: 'sales', values: weekdayRows(4, DAYS12) }],
      xField: 'day',
      yField: 'sales',
      legends: { visible: false },
      tooltip: { visible: false },
      axes: [{ orient: 'left', type: 'linear', min: 0, max: 60 }, { orient: 'bottom', type: 'band' }],
      animationUpdate: { bar: { type: 'update', duration: 600, easing: 'cubicInOut', oneByOne: oneByOne() } },
    }) as unknown as ISpec;
  const chart = createChart(el, ctx, spec());
  let seed = 4;
  let alive = true;
  const next = (): void => {
    if (alive) void chart.vchart.updateData('sales', weekdayRows(++seed, DAYS12));
  };
  let stop = every(3600, next);
  if (!ctx.preview) {
    const bar = controlBar(el);
    el.insertBefore(bar, chart.container);
    select(bar, 'oneByOne', MODES, (v) => {
      mode = v;
      void chart.vchart.updateSpec(spec());
      stop();
      next();
      stop = every(3600, next);
    });
  }
  return () => {
    alive = false;
    stop();
    chart.release();
  };
};

export default mount;
