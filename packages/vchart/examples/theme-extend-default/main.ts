// A theme built from a built-in one with getTheme and a spread
import VChart from '@visactor/vchart';
import type { ISpec } from '@visactor/vchart';
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, readout, select } from '../../shared/chart.ts';
import { WARM, grouped } from '../../shared/theme-data.ts';

/** Takes a built-in theme and adds a palette, wider bars and bigger axis labels on top of it. */
function extend(base: 'dark' | 'light'): string {
  const baseTheme = VChart.ThemeManager.getTheme(base);
  const name = `showcase-extended-${base}`;
  VChart.ThemeManager.registerTheme(name, {
    ...baseTheme,
    name,
    // The light theme paints its own white background; make it a soft panel so the card still reads.
    background: base === 'light' ? '#EEF1F8' : 'transparent',
    colorScheme: { default: WARM },
    series: { ...baseTheme.series, bar: { ...baseTheme.series?.bar, barMaxWidth: 34 } },
    component: {
      ...baseTheme.component,
      axis: { ...baseTheme.component?.axis, label: { ...baseTheme.component?.axis?.label, style: { ...baseTheme.component?.axis?.label?.style, fontSize: 14 } } },
    },
  } as never);
  return name;
}

const mount: Mount = (el, ctx) => {
  const names = { dark: extend('dark'), light: extend('light') };
  const spec: ISpec = {
    type: 'bar',
    data: [{ id: 'days', values: grouped() }],
    xField: 'type',
    yField: 'value',
    seriesField: 'group',
    legends: { visible: !ctx.preview },
  };
  const bar = ctx.preview ? null : controlBar(el);
  const { vchart, release } = createChart(el, ctx, spec, { init: { theme: undefined } });
  const out = bar ? readout(el) : null;
  let released = false;
  const apply = (base: 'dark' | 'light'): void => {
    if (released) return;
    vchart.setCurrentThemeSync(names[base]);
    if (out) out.textContent = `getCurrentThemeName(): ${vchart.getCurrentThemeName()}\ngetTheme('${base}') was spread into the new theme, then colorScheme, series.bar and component.axis were overridden.`;
  };
  apply('dark');

  let stop = (): void => {};
  if (ctx.preview) {
    let i = 0;
    stop = every(2000, () => apply(++i % 2 ? 'light' : 'dark'));
  } else if (bar) {
    select(bar, 'extend built-in', ['dark', 'light'], (v) => apply(v === 'light' ? 'light' : 'dark'));
  }

  return () => {
    released = true;
    stop();
    release();
  };
};

export default mount;
