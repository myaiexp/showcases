// vchart.registerFunction: one name, a different function on each of two charts
import VChart from '@visactor/vchart';
import type { Mount } from '@/types.ts';
import { THEME, every, readout } from '../../shared/chart.ts';
import { DAYS } from '../../shared/events-data.ts';

const spec = (): never =>
  ({
    type: 'bar',
    data: [{ id: 'sales', values: DAYS.map((month, i) => ({ month, sales: 12 + ((i * 11) % 24) })) }],
    xField: 'month',
    yField: 'sales',
    label: { visible: true, formatMethod: 'showcase.instanceLabel', style: { fill: '#E6E9F2' } },
  }) as never;

const mount: Mount = (el, ctx) => {
  const h = ctx.preview ? 90 : 220;
  // The name must resolve while the chart is drawn, so the VChart is built by hand here:
  // construct, registerFunction on the instance, then renderSync (createChart renders at once).
  const make = (fn: (v: number) => string): { vchart: VChart; container: HTMLDivElement } => {
    const container = document.createElement('div');
    container.style.cssText = 'width:100%;height:' + h + 'px';
    el.append(container);
    const vchart = new VChart(spec(), { theme: THEME, dom: container });
    vchart.registerFunction('showcase.instanceLabel', fn);
    vchart.renderSync();
    return { vchart, container };
  };
  const a = make((v) => v + ' units');
  const b = make((v) => '$' + v + 'k');

  if (!ctx.preview) {
    readout(el).textContent =
      'top chart: ' + String(a.vchart.getFunction('showcase.instanceLabel')?.(5)) + '   bottom chart: ' + String(b.vchart.getFunction('showcase.instanceLabel')?.(5)) + '\n' +
      "VChart.getFunction('showcase.instanceLabel') on the page: " + String(VChart.getFunction('showcase.instanceLabel'));
  }

  let released = false;
  let k = 0;
  const stop = every(ctx.preview ? 1800 : 2500, () => {
    if (released) return;
    k += 1;
    const values = DAYS.map((month, i) => ({ month, sales: 8 + ((i * 7 + k * 13) % 30) }));
    void a.vchart.updateData('sales', values);
    void b.vchart.updateData('sales', values);
  });

  return () => {
    released = true;
    stop();
    for (const c of [a, b]) {
      c.vchart.release();
      c.container.remove();
    }
  };
};

export default mount;
