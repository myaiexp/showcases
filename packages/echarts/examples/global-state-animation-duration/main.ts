// Emphasis-state transitions timed by the root stateAnimation and by a series-level override
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { createChart, controlBar, select, slider, button, every } from '../../shared/chart.ts';

const cats = ['A', 'B', 'C', 'D', 'E'];

function build(duration: number, easing: string, ownDuration: number): EChartsOption {
  const emphasis = { itemStyle: { color: '#fac858', borderColor: '#fff', borderWidth: 2 } };
  return {
    // Root: how long every series takes to enter or leave a state (emphasis, blur, select).
    stateAnimation: { duration, easing: easing as 'linear' },
    legend: {},
    tooltip: { show: false },
    grid: { top: 24, left: 40, right: 16, bottom: 60 },
    xAxis: { type: 'category', data: cats },
    yAxis: { type: 'value' },
    series: [
      { name: 'Root stateAnimation', type: 'bar', data: [32, 48, 41, 56, 38], emphasis },
      // A series can carry its own stateAnimation, which wins over the root one.
      { name: 'Own stateAnimation', type: 'bar', data: [28, 40, 52, 44, 49], stateAnimation: { duration: ownDuration, easing: 'cubicOut' }, emphasis },
    ],
  };
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  let duration = ctx.preview ? 900 : 300;
  let easing = 'cubicOut';
  let own = 100;
  const show = (): void => {
    chart.setOption(build(duration, easing, own));
  };
  show();

  // Highlight the same category in both series, then release it.
  let current = -1;
  const toggle = (): void => {
    if (current >= 0) chart.dispatchAction({ type: 'downplay', dataIndex: current });
    current = (current + 1) % cats.length;
    chart.dispatchAction({ type: 'highlight', dataIndex: current });
  };

  let stop = (): void => {};
  if (ctx.preview) {
    stop = every(1500, toggle);
  } else {
    slider(bar!, 'root duration (ms)', [0, 1500, 50], duration, (v) => { duration = v; show(); });
    select(bar!, 'easing', ['cubicOut', 'linear', 'bounceOut', 'elasticOut', 'backOut'], (v) => { easing = v; show(); });
    slider(bar!, 'series 2 duration (ms)', [0, 1500, 50], own, (v) => { own = v; show(); });
    button(bar!, 'highlight next category', toggle);
    button(bar!, 'downplay', () => {
      chart.dispatchAction({ type: 'downplay' });
      current = -1;
    });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
