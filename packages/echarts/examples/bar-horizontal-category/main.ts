// Horizontal bars: a category yAxis and a value xAxis, with inverse ordering and a label at the bar end
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every, select } from '../../shared/chart.ts';
import { seeded, between } from '../../shared/bar-data.ts';

const languages = ['Rust', 'TypeScript', 'Python', 'Go', 'Kotlin', 'Swift', 'Zig', 'Elixir'];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  const rand = seeded(11);
  let values = languages.map(() => between(rand, 20, 100));
  let inverse = true;
  let sorted = true;
  let position: 'right' | 'insideRight' | 'insideLeft' = 'right';

  const apply = (): void => {
    const rows = languages.map((name, i) => ({ name, value: values[i]! }));
    // Ascending in the data; with an inverse category axis the first item sits at the top.
    if (sorted) rows.sort((a, b) => b.value - a.value);
    chart.setOption({
      grid: { top: 12, left: 80, right: 40, bottom: 28 },
      // The roles swap: the category axis is y, the value axis is x. The bars grow to the right.
      yAxis: { type: 'category', data: rows.map((r) => r.name), inverse },
      xAxis: { type: 'value', max: 110 },
      series: {
        type: 'bar',
        data: rows.map((r) => r.value),
        colorBy: 'data',
        barWidth: '60%',
        itemStyle: { borderRadius: [0, 4, 4, 0] },
        label: { show: true, position, color: position === 'right' ? undefined : '#111' },
      },
    });
  };
  apply();

  let stop = (): void => {};
  if (bar) {
    select(bar, 'label.position', ['right', 'insideRight', 'insideLeft'], (v) => {
      position = v as typeof position;
      apply();
    });
    const inv = button(bar, 'yAxis.inverse: on', () => {
      inverse = !inverse;
      inv.textContent = `yAxis.inverse: ${inverse ? 'on' : 'off'}`;
      apply();
    });
    const srt = button(bar, 'sorted: on', () => {
      sorted = !sorted;
      srt.textContent = `sorted: ${sorted ? 'on' : 'off'}`;
      apply();
    });
    button(bar, 'new data', () => {
      values = languages.map(() => between(rand, 20, 100));
      apply();
    });
  } else {
    stop = every(1800, () => {
      values = languages.map(() => between(rand, 20, 100));
      apply();
    });
  }
  return () => {
    stop();
    dispose();
  };
};

export default mount;
