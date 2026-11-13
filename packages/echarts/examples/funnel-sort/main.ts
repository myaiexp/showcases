// Funnel with sort, gap and label position options, cycling through the variants
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select } from '../../shared/chart.ts';

const stages = [
  { value: 100, name: 'Visits' },
  { value: 80, name: 'Signups' },
  { value: 60, name: 'Trials' },
  { value: 40, name: 'Purchases' },
  { value: 20, name: 'Renewals' },
];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);

  const state = { sort: 'descending', labelPosition: 'inside', gap: 2, align: 'center' };
  const apply = (): void => {
    chart.setOption({
      tooltip: { trigger: 'item', formatter: '{b}: {c}' },
      series: [
        {
          type: 'funnel',
          left: '10%',
          width: '80%',
          top: 10,
          bottom: 10,
          min: 0,
          max: 100,
          sort: state.sort, // 'descending' | 'ascending' | 'none'
          gap: state.gap, // pixels between layers
          funnelAlign: state.align,
          label: { show: true, position: state.labelPosition }, // inside, left, right...
          labelLine: { length: 12 },
          itemStyle: { borderColor: '#222', borderWidth: 1 },
          emphasis: { label: { fontSize: 16 } },
          data: stages,
        },
      ],
    });
  };
  apply();

  if (bar) {
    select(bar, 'sort', ['descending', 'ascending', 'none'], (v) => { state.sort = v; apply(); });
    select(bar, 'label.position', ['inside', 'left', 'right', 'outside'], (v) => { state.labelPosition = v; apply(); });
    select(bar, 'funnelAlign', ['center', 'left', 'right'], (v) => { state.align = v; apply(); });
    select(bar, 'gap', ['0', '2', '10'], (v) => { state.gap = Number(v); apply(); });
  }

  // Preview: flip between sort orders and label sides.
  let i = 0;
  const steps = [
    ['descending', 'inside', 2],
    ['ascending', 'right', 8],
    ['none', 'left', 2],
  ] as const;
  const stop = ctx.preview
    ? every(2000, () => {
        const [s, l, g] = steps[++i % steps.length]!;
        Object.assign(state, { sort: s, labelPosition: l, gap: g });
        apply();
      })
    : () => {};

  return () => {
    stop();
    dispose();
  };
};

export default mount;
