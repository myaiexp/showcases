// registerTheme, then the theme applied by name in the constructor
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { button, controlBar, createChart, every } from '../../shared/chart.ts';
import { OCEAN, elements, registerShowcaseTheme } from '../../shared/theme-data.ts';

const mount: Mount = (el, ctx) => {
  // The theme object of Customize_Theme.md: a palette, bar defaults, an axis font and rounded bars.
  const name = registerShowcaseTheme('customize-bars', {
    colorScheme: { default: OCEAN },
    series: { bar: { barMaxWidth: 28, label: { visible: true, position: 'top', formatMethod: (text: unknown) => `${text}%` } } },
    component: { axis: { label: { style: { fontFamily: 'Times New Roman', fontSize: 12 } } } },
    markByName: { bar: { style: { cornerRadius: 12 } } },
  } as never);

  const spec: ISpec = {
    type: 'bar',
    data: [{ id: 'elements', values: elements(ctx.preview ? 6 : 8) }],
    xField: 'type',
    yField: 'value',
    seriesField: 'type',
    legends: { visible: !ctx.preview },
    title: { visible: !ctx.preview, text: 'Surface element content' },
  };
  // The registered name goes to the constructor's theme option; the spec itself says nothing about style.
  const bar = ctx.preview ? null : controlBar(el);
  const { vchart, release } = createChart(el, ctx, spec, { init: { theme: name } });

  let released = false;
  let k = 1;
  const reshuffle = (): void => {
    if (released) return;
    k = k === 1 ? 0.6 : 1;
    void vchart.updateData('elements', elements(ctx.preview ? 6 : 8, k));
  };
  let stop = (): void => {};
  if (ctx.preview) stop = every(2200, reshuffle);
  else if (bar) button(bar, 'Change the values', reshuffle);

  return () => {
    released = true;
    stop();
    release();
  };
};

export default mount;
