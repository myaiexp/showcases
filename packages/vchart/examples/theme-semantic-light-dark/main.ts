// Palette tokens in the theme, light and dark registered themes
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select } from '../../shared/chart.ts';
import { grouped, registerShowcaseTheme } from '../../shared/theme-data.ts';

const mount: Mount = (el, ctx) => {
  const tok = (key: string): { type: 'palette'; key: string } => ({ type: 'palette', key });
  // The component styles are written once in tokens and shared; only the palette values differ per theme.
  const component = {
    axis: { grid: { style: { stroke: tok('gridColor'), lineDash: [] } }, label: { style: { fill: tok('textColor') } } },
    discreteLegend: { item: { label: { style: { fill: tok('textColor') } } } },
  };
  const dark = registerShowcaseTheme('tokens-dark', {
    background: '#14171F',
    colorScheme: { default: { dataScheme: ['#5383F4', '#FF9D2C'], palette: { gridColor: '#2B3140', textColor: '#C9D1E3' } } },
    component,
  } as never);
  const light = registerShowcaseTheme('tokens-light', {
    type: 'light',
    background: '#F3F5FA',
    colorScheme: { default: { dataScheme: ['#1857A3', '#D9731A'], palette: { gridColor: '#D5DAE6', textColor: '#2A3142' } } },
    component,
  } as never);

  const spec = {
    type: 'bar',
    data: [{ id: 'days', values: grouped() }],
    xField: 'type',
    yField: 'value',
    seriesField: 'group',
    legends: { visible: !ctx.preview },
  } as never;

  const bar = ctx.preview ? null : controlBar(el);
  const { vchart, release } = createChart(el, ctx, spec, { init: { theme: undefined } });
  void vchart.setCurrentTheme(dark);
  let released = false;
  const apply = (name: string): void => {
    if (!released) void vchart.setCurrentTheme(name);
  };

  let stop = (): void => {};
  if (ctx.preview) {
    let i = 0;
    stop = every(1800, () => apply(++i % 2 ? light : dark));
  } else if (bar) {
    select(bar, 'theme', [dark, light], apply);
  }

  return () => {
    released = true;
    stop();
    release();
  };
};

export default mount;
