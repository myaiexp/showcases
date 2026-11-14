// Bar labels with a styled plain label and rich fragments, showing v6 inheritance against richInheritPlainLabel: false
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select } from '../../shared/chart.ts';

type Where = 'root' | 'label';

function build(inherit: boolean, where: Where, preview: boolean): EChartsOption {
  const label = {
    show: true,
    position: 'top' as const,
    // The plain label style: every fragment without its own value of these now inherits them (v6).
    fontSize: preview ? 14 : 20,
    fontWeight: 'bold' as const,
    fontStyle: 'italic' as const,
    textShadowColor: 'rgba(250, 200, 88, 0.9)',
    textShadowBlur: 6,
    color: '#fff',
    formatter: '{num|{c}} {unit|units}\n{note|plain fragment}',
    // The fragments set only colour; v6 fills the other styles in from the plain label.
    rich: {
      num: { color: '#fac858' },
      unit: { color: '#91cc75' },
      // note sets its own fontSize, which always wins over the inherited one.
      note: { color: '#aaa', fontSize: 11 },
    },
    // The same switch can sit on one label instead of the root of the option.
    ...(where === 'label' ? { richInheritPlainLabel: inherit } : {}),
  };
  const option = {
    // Root level: usually the place to set it (v6 upgrade guide).
    ...(where === 'root' ? { richInheritPlainLabel: inherit } : {}),
    grid: { top: 56, left: 36, right: 16, bottom: 30 },
    xAxis: { type: 'category', data: ['A', 'B', 'C', 'D'] },
    yAxis: { show: false, max: 70 },
    series: [{ type: 'bar', data: [32, 45, 28, 51], barWidth: '50%', label }],
  };
  return option as EChartsOption;
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  let inherit = true;
  let where: Where = 'root';
  const show = (): void => {
    chart.setOption(build(inherit, where, ctx.preview), true);
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    stop = every(2000, () => {
      inherit = !inherit;
      show();
    });
  } else {
    select(bar!, 'richInheritPlainLabel', ['true (v6 default)', 'false (v5 look)'], (v) => {
      inherit = v.startsWith('true');
      show();
    });
    select(bar!, 'set on', ['root', 'label'], (v) => {
      where = v as Where;
      show();
    });
  }
  return () => {
    stop();
    dispose();
  };
};

export default mount;
