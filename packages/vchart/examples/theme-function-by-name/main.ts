// A JSON-style theme that refers to a registered function by name
import VChart from '@visactor/vchart';
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every, readout } from '../../shared/chart.ts';
import { registerShowcaseTheme } from '../../shared/theme-data.ts';

const rows = (k: number): { type: string; value: number }[] =>
  ['A', 'B', 'C', 'D', 'E', 'F'].map((type, i) => ({ type, value: Math.round(((i * 37 + k * 23) % 90) - 40) }));

const mount: Mount = (el, ctx) => {
  // The callback lives in the function registry; the prefix keeps the name unique on the page.
  VChart.registerFunction('showcase.theme.bar.fill', (datum: { value: number }) => (datum.value < 0 ? '#f53f3f' : '#00b42a'));
  // Plain data (could be loaded from JSON): the fill is the name of that function.
  const themeJson = JSON.stringify({ series: { bar: { bar: { style: { fill: 'showcase.theme.bar.fill' } } } } });
  const name = registerShowcaseTheme('function-fill', JSON.parse(themeJson));

  const bar = ctx.preview ? null : controlBar(el);
  const { vchart, release } = createChart(
    el,
    ctx,
    { type: 'bar', data: [{ id: 'rows', values: rows(0) }], xField: 'type', yField: 'value', label: { visible: !ctx.preview, style: { fill: '#E6E9F2' } } },
    { init: { theme: name } },
  );
  if (bar) readout(el).textContent = `theme (JSON): ${themeJson}\nregisterFunction('showcase.theme.bar.fill', datum => datum.value < 0 ? red : green)`;

  let released = false;
  let k = 0;
  const next = (): void => {
    if (released) return;
    k += 1;
    void vchart.updateData('rows', rows(k));
  };
  let stop = (): void => {};
  if (ctx.preview) stop = every(1600, next);
  else if (bar) button(bar, 'New values', next);

  return () => {
    released = true;
    stop();
    release();
  };
};

export default mount;
