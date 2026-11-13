// Chord emphasis.focus (self, series, none) with blurScope, plus per-node colour, label and emphasis styles
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select } from '../../shared/chart.ts';

const teams = ['Design', 'Frontend', 'Backend', 'Data', 'Ops'];
const handoffs: [number, number, number][] = [
  [0, 1, 18], [1, 2, 14], [2, 3, 9], [2, 4, 12], [3, 1, 6], [4, 2, 5], [1, 0, 7], [3, 4, 4], [0, 3, 3],
];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 480 });

  const render = (focus: string, blurScope: string): void => {
    chart.setOption({
      tooltip: {},
      series: [
        {
          type: 'chord',
          radius: ['62%', '78%'],
          padAngle: 3,
          label: { show: true, position: 'outside', fontSize: ctx.preview ? 10 : 12 },
          lineStyle: { color: 'gradient', opacity: 0.45 },
          // emphasis.focus: 'self' keeps only the hovered sector sharp, 'series' keeps the
          // whole series. blurScope sets how far the fade reaches.
          emphasis: { focus, blurScope },
          blur: { itemStyle: { opacity: 0.25 }, label: { opacity: 0.3 } },
          data: teams.map((name, i) => ({
            name,
            // A node can carry its own itemStyle, label and emphasis state.
            ...(i === 2 ? { itemStyle: { color: '#ee6666' }, label: { fontWeight: 'bold', color: '#ee6666' } } : {}),
            ...(i === 4 ? { emphasis: { itemStyle: { shadowBlur: 18, shadowColor: '#fac858' }, label: { color: '#fac858' } } } : {}),
          })),
          links: handoffs.map(([s, t, value]) => ({ source: teams[s], target: teams[t], value })),
        },
      ],
    });
  };

  let focus = 'self';
  let blurScope = 'coordinateSystem';
  render(focus, blurScope);

  if (ctx.preview) {
    let i = 0;
    const stop = every(1100, () => {
      chart.dispatchAction({ type: 'downplay', seriesIndex: 0 });
      chart.dispatchAction({ type: 'highlight', seriesIndex: 0, dataIndex: i++ % teams.length });
    });
    return () => {
      stop();
      dispose();
    };
  }

  select(bar!, 'emphasis.focus', ['self', 'series', 'none'], (v) => {
    focus = v;
    render(focus, blurScope);
  });
  select(bar!, 'emphasis.blurScope', ['coordinateSystem', 'series', 'global'], (v) => {
    blurScope = v;
    render(focus, blurScope);
  });

  return dispose;
};

export default mount;
