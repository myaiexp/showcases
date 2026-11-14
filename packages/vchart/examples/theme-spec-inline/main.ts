// A theme object passed in the chart spec, no registration
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, every, select } from '../../shared/chart.ts';
import { MINT, OCEAN, WARM, grouped } from '../../shared/theme-data.ts';

const PALETTES: Record<string, string[]> = { ocean: OCEAN, warm: WARM, mint: MINT };

const mount: Mount = (el, ctx) => {
  const build = (palette: string): ISpec => ({
    type: 'bar',
    data: [{ id: 'days', values: grouped() }],
    xField: 'type',
    yField: 'value',
    seriesField: 'group',
    // The inline theme: it merges onto the chart's base theme for this one instance.
    theme: {
      colorScheme: { default: PALETTES[palette] ?? OCEAN },
      series: { bar: { barMaxWidth: 22 } },
      markByName: { bar: { style: { cornerRadius: [6, 6, 0, 0] } } },
    },
    legends: { visible: !ctx.preview },
  } as ISpec);

  const bar = ctx.preview ? null : controlBar(el);
  const { vchart, release } = createChart(el, ctx, build('ocean'));
  let released = false;
  const apply = (palette: string): void => {
    if (!released) void vchart.updateSpec(build(palette));
  };

  let stop = (): void => {};
  if (ctx.preview) {
    const names = Object.keys(PALETTES);
    let i = 0;
    stop = every(1800, () => apply(names[++i % names.length] ?? 'ocean'));
  } else {
    if (bar) select(bar, 'palette in spec.theme', Object.keys(PALETTES), apply);
  }

  return () => {
    released = true;
    stop();
    release();
  };
};

export default mount;
