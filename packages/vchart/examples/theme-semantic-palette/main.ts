// A semantic palette: colour tokens used in the theme styles
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select } from '../../shared/chart.ts';
import { grouped } from '../../shared/theme-data.ts';

const dataScheme = ['#5383F4', '#7BCF8E'];
const PALETTES: Record<string, Record<string, string>> = {
  'cool tokens': { axisGridColor: '#2B3A55', axisDomainColor: '#5383F4', labelFontColor: '#80D8FB', titleColor: '#FFFFFF' },
  'amber tokens': { axisGridColor: '#4A3A1E', axisDomainColor: '#FF9D2C', labelFontColor: '#FFDB26', titleColor: '#FFE9B0' },
};

const mount: Mount = (el, ctx) => {
  const tok = (key: string): { type: 'palette'; key: string } => ({ type: 'palette', key });
  // The tokens are written inside the theme (its component styles); VChart swaps them for the
  // palette's values when it reads the theme. In 2.2 they are not resolved inside the spec itself.
  const build = (name: string): never =>
    ({
      type: 'bar',
      data: [{ id: 'days', values: grouped() }],
      xField: 'type',
      yField: 'value',
      seriesField: 'group',
      theme: {
        colorScheme: { default: { dataScheme, palette: PALETTES[name] } },
        component: {
          title: { textStyle: { fill: tok('titleColor') } },
          axis: {
            domainLine: { style: { stroke: tok('axisDomainColor'), lineWidth: 2 } },
            tick: { style: { stroke: tok('axisDomainColor') } },
            grid: { style: { stroke: tok('axisGridColor'), lineDash: [] } },
            label: { style: { fill: tok('labelFontColor') } },
          },
        },
      },
      title: { visible: !ctx.preview, text: 'Weekly totals' },
      legends: { visible: !ctx.preview },
      axes: [
        { orient: 'bottom', type: 'band', domainLine: { visible: true }, tick: { visible: true } },
        { orient: 'left', type: 'linear', grid: { visible: true } },
      ],
    }) as never;

  const names = Object.keys(PALETTES);
  const bar = ctx.preview ? null : controlBar(el);
  const { vchart, release } = createChart(el, ctx, build('cool tokens'));
  let released = false;
  const apply = (n: string): void => {
    if (!released) void vchart.updateSpec(build(n));
  };

  let stop = (): void => {};
  if (ctx.preview) {
    let i = 0;
    stop = every(1800, () => apply(names[++i % names.length] ?? 'cool tokens'));
  } else if (bar) {
    select(bar, 'palette tokens', names, apply);
  }

  return () => {
    released = true;
    stop();
    release();
  };
};

export default mount;
