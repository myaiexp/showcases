// registerFunction, getFunction, getFunctionList, unregisterFunction
import VChart from '@visactor/vchart';
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every, readout } from '../../shared/chart.ts';
import { DAYS } from '../../shared/events-data.ts';

const NAME = 'showcase.registry.label';

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { vchart, release } = createChart(
    el,
    ctx,
    {
      type: 'bar',
      data: [{ id: 'sales', values: DAYS.map((month, i) => ({ month, sales: 10 + ((i * 9) % 22) })) }],
      xField: 'month',
      yField: 'sales',
      label: { visible: true, formatMethod: NAME, style: { fill: '#E6E9F2' } },
    } as never,
    { previewHeight: 130 },
  );
  const out = readout(el);
  let released = false;
  let n = 0;

  const report = (note: string): void => {
    const mine = (VChart.getFunctionList() ?? []).filter((k) => k.startsWith('showcase.'));
    out.textContent = `${note}\ngetFunction('${NAME}'): ${VChart.getFunction(NAME) ? 'a function' : 'null'}\ngetFunctionList() has ${mine.length} showcase.* names`;
  };
  const redraw = (): void => {
    if (!released) void vchart.updateSpec({ label: { visible: true, formatMethod: NAME } } as never);
  };
  const register = (): void => {
    if (released) return;
    n += 1;
    VChart.registerFunction(NAME, n % 2 ? (v: number) => v + ' pts' : (v: number) => '<' + v + '>');
    redraw();
    report('registerFunction: the labels use the new function');
  };
  const unregister = (): void => {
    if (released) return;
    VChart.unregisterFunction(NAME);
    redraw();
    report('unregisterFunction: the name no longer resolves');
  };
  register();

  let stop = (): void => {};
  if (ctx.preview) {
    let i = 0;
    stop = every(1600, () => (++i % 3 === 0 ? unregister() : register()));
  } else if (bar) {
    button(bar, 'registerFunction', register);
    button(bar, 'unregisterFunction', unregister);
    button(bar, 'getFunctionList', () => report('getFunctionList()'));
  }

  return () => {
    released = true;
    stop();
    VChart.unregisterFunction(NAME);
    release();
  };
};

export default mount;
