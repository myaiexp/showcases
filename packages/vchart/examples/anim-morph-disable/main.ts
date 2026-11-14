// series.morph.enable: false replaces the morph with a plain exit and enter
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, every } from '../../shared/chart.ts';

const mount: Mount = (el, ctx) => {
  let enable = true;
  const base = (): ISpec =>
    ({
      type: 'pie',
      data: [{ id: 's', values: ['A', 'B', 'C', 'D'].map((type, i) => ({ type, value: [40, 30, 20, 10][i] })) }],
      valueField: 'value',
      categoryField: 'type',
      outerRadius: 0.8,
      innerRadius: 0.5,
      legends: { visible: false },
      title: { visible: true, text: enable ? 'morph.enable: true' : 'morph.enable: false', textStyle: { fontSize: ctx.preview ? 12 : 16 } },
      morph: { enable },
    }) as ISpec;
  const bar = (): ISpec => ({ ...base(), type: 'bar', xField: 'type', yField: 'value', seriesField: 'type' }) as ISpec;
  const chart = createChart(el, ctx, base());
  if (!ctx.preview) {
    const box = document.createElement('input');
    box.type = 'checkbox';
    box.checked = true;
    box.addEventListener('change', () => (enable = box.checked));
    const label = document.createElement('label');
    label.append(box, ' morph.enable');
    controlBar(el).append(label);
    el.insertBefore(el.lastElementChild as Element, chart.container);
  }
  let n = 0;
  let alive = true;
  const stop = every(2800, () => {
    if (!alive) return;
    if (ctx.preview && n % 2 === 0) enable = !enable;
    void chart.vchart.updateSpec(++n % 2 ? bar() : base());
  });
  return () => {
    alive = false;
    stop();
    chart.release();
  };
};

export default mount;
