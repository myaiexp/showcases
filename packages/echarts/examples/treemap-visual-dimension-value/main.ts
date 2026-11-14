// Treemap where area is value[0] and colour comes from another dimension via levels.visualDimension
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every, select } from '../../shared/chart.ts';
import { project, withGrowth } from '../../shared/hierarchy-data.ts';

// Every value is [size KB, growth %]; ids let colorMappingBy 'id' keep a node's colour.
const withIds = (n: ReturnType<typeof withGrowth>, path = ''): Record<string, unknown> => ({
  ...n,
  id: `${path}/${n.name}`,
  ...(n.children ? { children: n.children.map((c) => withIds(c, `${path}/${n.name}`)) } : {}),
});
const data = (project.children ?? []).map((c) => withIds(withGrowth(c)));

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 480 });

  const render = (dimension: number, mapping: string, fixed: boolean, alpha: boolean): void => {
    // The same colour rule on every depth; only borders differ per level.
    const rule = {
      // visualDimension: which element of value[] feeds the colour (0 = size, 1 = growth).
      visualDimension: dimension,
      // colorMappingBy: 'value' maps the number onto the colour list, 'index' gives
      // neighbours different colours, 'id' ties a colour to the node id.
      colorMappingBy: mapping,
      color: ['#d9534f', '#e8e8a0', '#4caf50'],
      // visualMin / visualMax fix the extent used for 'value' mapping (growth runs -20..40).
      ...(fixed && dimension === 1 ? { visualMin: -20, visualMax: 40 } : {}),
      colorAlpha: alpha ? [0.5, 1] : undefined,
    };
    chart.setOption(
      {
        tooltip: {
          formatter: (p: unknown): string => {
            const v = (p as { name: string; value: number | number[] }).value;
            const [size, growth] = Array.isArray(v) ? v : [v, 0];
            return `${(p as { name: string }).name}<br/>size ${size} KB, growth ${growth}%`;
          },
        },
        series: [
          {
            type: 'treemap',
            data,
            roam: false,
            nodeClick: false,
            breadcrumb: { show: false },
            top: 4,
            bottom: 4,
            left: 4,
            right: 4,
            label: { show: !ctx.preview, formatter: '{b}', fontSize: 11 },
            upperLabel: { show: false },
            levels: [
              { ...rule, itemStyle: { borderColor: '#222', borderWidth: 2, gapWidth: 2 } },
              { ...rule, itemStyle: { borderColor: '#222', borderWidth: 1, gapWidth: 1 } },
              { ...rule, itemStyle: { borderColor: '#222', borderWidth: 1, gapWidth: 1 } },
              { ...rule, itemStyle: { borderColor: '#222', borderWidth: 1, gapWidth: 1 } },
            ],
            animationDurationUpdate: 600,
          },
        ],
      },
      true,
    );
  };

  let dimension = 1;
  let mapping = 'value';
  let fixed = false;
  let alpha = false;
  render(dimension, mapping, fixed, alpha);

  if (ctx.preview) {
    const steps: [number, string][] = [[1, 'value'], [0, 'value'], [1, 'index'], [1, 'id']];
    let i = 0;
    const stop = every(2000, () => {
      i++;
      [dimension, mapping] = steps[i % steps.length]!;
      render(dimension, mapping, fixed, alpha);
    });
    return () => {
      stop();
      dispose();
    };
  }

  select(bar!, 'visualDimension', ['1', '0'], (v) => {
    dimension = Number(v);
    render(dimension, mapping, fixed, alpha);
  });
  select(bar!, 'colorMappingBy', ['value', 'index', 'id'], (v) => {
    mapping = v;
    render(dimension, mapping, fixed, alpha);
  });
  const fb = button(bar!, 'visualMin/Max: auto', () => {
    fixed = !fixed;
    fb.textContent = `visualMin/Max: ${fixed ? '-20 / 40' : 'auto'}`;
    render(dimension, mapping, fixed, alpha);
  });
  const ab = button(bar!, 'colorAlpha: off', () => {
    alpha = !alpha;
    ab.textContent = `colorAlpha: ${alpha ? '[0.5, 1]' : 'off'}`;
    render(dimension, mapping, fixed, alpha);
  });

  return dispose;
};

export default mount;
