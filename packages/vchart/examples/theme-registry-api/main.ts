// ThemeManager: registerTheme, themeExist, getTheme, removeTheme
import VChart from '@visactor/vchart';
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every, readout } from '../../shared/chart.ts';
import { grouped, registerShowcaseTheme } from '../../shared/theme-data.ts';

const TEMP = 'showcase-temp-registry';

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { vchart, release } = createChart(
    el,
    ctx,
    { type: 'bar', data: [{ id: 'days', values: grouped() }], xField: 'type', yField: 'value', seriesField: 'group', legends: { visible: false } },
    { init: { theme: undefined }, previewHeight: 130 },
  );
  const out = readout(el);
  let released = false;
  let n = 0;

  const report = (note: string): void => {
    const mine = Object.keys(VChart.ThemeManager.themes).filter((k) => k.startsWith('showcase-'));
    out.textContent = `${note}\nthemeExist('${TEMP}'): ${VChart.ThemeManager.themeExist(TEMP)}\nshowcase themes registered: ${mine.length}\ngetCurrentThemeName(): ${vchart.getCurrentThemeName()}`;
  };
  const register = (): void => {
    if (released) return;
    n += 1;
    const colors = n % 2 ? ['#FF6B6B', '#FFA07A'] : ['#4ECDC4', '#45B7D1'];
    registerShowcaseTheme('temp-registry', { colorScheme: { default: colors } });
    vchart.setCurrentThemeSync(TEMP);
    report('registerTheme + vchart.setCurrentTheme');
  };
  const remove = (): void => {
    if (released) return;
    const ok = VChart.ThemeManager.removeTheme(TEMP);
    report(`removeTheme('${TEMP}') returned ${ok}`);
  };
  const inspect = (): void => {
    if (released) return;
    const t = VChart.ThemeManager.themeExist(TEMP) ? VChart.ThemeManager.getTheme(TEMP) : undefined;
    report(t ? `getTheme('${TEMP}').colorScheme.default: ${JSON.stringify(t.colorScheme?.default)}` : 'getTheme: nothing registered under that name');
  };
  register();

  let stop = (): void => {};
  if (ctx.preview) {
    let i = 0;
    stop = every(1500, () => (++i % 3 === 2 ? remove() : register()));
  } else if (bar) {
    button(bar, 'registerTheme', register);
    button(bar, 'getTheme', inspect);
    button(bar, 'removeTheme', remove);
  }

  return () => {
    released = true;
    stop();
    release();
    VChart.ThemeManager.removeTheme(TEMP);
  };
};

export default mount;
