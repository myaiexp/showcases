// brush on one grid linked to a series on another grid: brushLink, brushMode, throttle and takeGlobalCursor
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every, select, slider } from '../../shared/chart.ts';
import { seeded } from '../../shared/interaction-data.ts';

const N = 60;
const rand = seeded(61);
const days = Array.from({ length: N }, (_, i) => 'Day ' + (i + 1));
const temp = days.map((_, i) => Math.round((18 + 9 * Math.sin(i / 8) + rand() * 4) * 10) / 10);
// Same length as temp: brushLink maps dataIndex to dataIndex, so the two series must correspond.
const sales = temp.map((t) => Math.round(t * 3 + rand() * 30));

interface Look { link: boolean; mode: string; throttleType: string; delay: number }

function build(look: Look, compact: boolean): EChartsOption {
  return {
    brush: {
      // xAxisIndex/yAxisIndex limit brushing to the top grid's axes.
      xAxisIndex: 0,
      yAxisIndex: 0,
      // brushLink: series (by index) that mirror the selection. Only matched by dataIndex.
      brushLink: look.link ? [0, 1] : 'none',
      seriesIndex: [0],
      brushMode: look.mode as 'single',
      // throttleType/throttleDelay: how often brushSelected fires while dragging.
      throttleType: look.throttleType as 'fixRate',
      throttleDelay: look.delay,
      brushStyle: { borderWidth: 1, color: 'rgba(95, 180, 255, 0.2)', borderColor: '#5fb4ff' },
      // inBrush/outOfBrush: visuals of selected and unselected items, in every linked series.
      inBrush: { color: '#fac858', opacity: 1 },
      outOfBrush: { color: '#546a8a', opacity: 0.45 },
    },
    tooltip: { trigger: 'axis' },
    axisPointer: { link: [{ xAxisIndex: 'all' }] },
    grid: [
      { top: 18, left: 44, right: 16, height: compact ? '36%' : '34%' },
      { top: compact ? '58%' : '56%', left: 44, right: 16, bottom: 28 },
    ],
    xAxis: [
      { type: 'category', data: days, gridIndex: 0, axisLabel: { show: false } },
      { type: 'category', data: days, gridIndex: 1, axisLabel: { show: !compact, interval: 9 } },
    ],
    yAxis: [
      { type: 'value', gridIndex: 0, scale: true, splitNumber: 3 },
      { type: 'value', gridIndex: 1, splitNumber: 3 },
    ],
    series: [
      { name: 'Temperature', type: 'line', xAxisIndex: 0, yAxisIndex: 0, data: temp, symbolSize: 6 },
      { name: 'Sales', type: 'bar', xAxisIndex: 1, yAxisIndex: 1, data: sales },
    ],
  };
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 440 });
  const look: Look = { link: true, mode: 'single', throttleType: 'fixRate', delay: 0 };
  let brushType = 'lineX';
  const arm = (): void => {
    // The toolbox brush buttons dispatch this action; here the controls do.
    chart.dispatchAction({ type: 'takeGlobalCursor', key: 'brush', brushOption: { brushType: brushType as 'lineX', brushMode: look.mode as 'single' } });
  };
  const show = (): void => {
    chart.setOption(build(look, ctx.preview), true);
    if (!ctx.preview) arm();
  };
  show();

  let stop = (): void => {};
  if (bar) {
    const status = document.createElement('span');
    status.textContent = 'Drag on the temperature line.';
    chart.on('brushSelected', (e) => {
      const batch = (e as unknown as { batch: { selected: { dataIndex: number[] }[] }[] }).batch[0];
      const n = batch?.selected[0]?.dataIndex.length ?? 0;
      status.textContent = n ? n + ' days selected' : 'Drag on the temperature line.';
    });
    select(bar, 'brushType', ['lineX', 'rect'], (v) => {
      brushType = v;
      arm();
    });
    select(bar, 'brushMode', ['single', 'multiple'], (v) => {
      look.mode = v;
      show();
    });
    const link = button(bar, 'brushLink: on', () => {
      look.link = !look.link;
      link.textContent = 'brushLink: ' + (look.link ? 'on' : 'off');
      show();
    });
    select(bar, 'throttleType', ['fixRate', 'debounce'], (v) => {
      look.throttleType = v;
      show();
    });
    slider(bar, 'throttleDelay ms', [0, 500, 50], look.delay, (v) => {
      look.delay = v;
      show();
    });
    button(bar, 'Clear', () => chart.dispatchAction({ type: 'brush', areas: [] }));
    bar.append(status);
  } else {
    // Draw a lineX box programmatically and slide it along the days.
    let lo = 0;
    stop = every(1000, () => {
      lo = (lo + 6) % 42;
      chart.dispatchAction({ type: 'brush', areas: [{ xAxisIndex: 0, brushType: 'lineX', coordRange: [lo, lo + 14] }] });
    });
  }

  return () => {
    stop();
    chart.off('brushSelected');
    dispose();
  };
};

export default mount;
