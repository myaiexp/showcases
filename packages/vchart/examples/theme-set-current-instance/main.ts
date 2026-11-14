// vchart.setCurrentTheme switches one chart between themes
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, every, select } from '../../shared/chart.ts';
import { grouped, paletteThemes, registerShowcaseTheme } from '../../shared/theme-data.ts';

const mount: Mount = (el, ctx) => {
  // Three registered themes; the third also changes the bar shape and the axis colour.
  const [ocean, warm] = paletteThemes() as [string, string];
  const sharp = registerShowcaseTheme('sharp', {
    colorScheme: { default: ['#F7DC6F', '#FF6B6B'] },
    markByName: { bar: { style: { cornerRadius: 0 } } },
    component: { axis: { label: { style: { fill: '#F7DC6F' } } } },
  } as never);
  const names = [ocean, warm, sharp];

  const spec: ISpec = {
    type: 'bar',
    data: [{ id: 'days', values: grouped() }],
    xField: 'type',
    yField: 'value',
    seriesField: 'group',
    legends: { visible: !ctx.preview },
  };
  // No constructor theme: an option theme would be merged on top of whatever setCurrentTheme picks.
  const bar = ctx.preview ? null : controlBar(el);
  const { vchart, release } = createChart(el, ctx, spec, { init: { theme: undefined } });
  vchart.setCurrentThemeSync(ocean);

  let released = false;
  // VChart.ThemeManager.setCurrentTheme(name) would restyle every chart on the page, the other
  // gallery cards included, so this example only uses the instance method.
  const apply = (name: string): void => {
    if (!released) vchart.setCurrentThemeSync(name);
  };

  let stop = (): void => {};
  if (ctx.preview) {
    let i = 0;
    stop = every(1700, () => apply(names[++i % names.length] ?? ocean));
  } else {
    if (bar) select(bar, 'vchart.setCurrentTheme', names, apply);
  }

  return () => {
    released = true;
    stop();
    release();
  };
};

export default mount;
