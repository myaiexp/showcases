// Brush component: rect, polygon and lineX selection with a brushSelected readout
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every } from '../../shared/chart.ts';

let seed = 21;
const rnd = (): number => ((seed = (seed * 16807) % 2147483647) / 2147483647);
const points = Array.from({ length: 80 }, () => [Math.round(rnd() * 100), Math.round(rnd() * 100)]);

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const readout = document.createElement('div');
  readout.style.padding = '4px 0';
  readout.style.fontSize = '13px';
  readout.textContent = ctx.preview ? '' : 'Draw a selection on the chart.';
  if (!ctx.preview) el.append(readout);
  const { chart, dispose } = createChart(el, ctx, { height: 420 });

  chart.setOption({
    title: { text: ctx.preview ? 'selected: 0' : '', left: 'center', textStyle: { fontSize: 13 } },
    grid: { left: 40, right: 20, top: 30, bottom: 30 },
    xAxis: { type: 'value', min: 0, max: 100 },
    yAxis: { type: 'value', min: 0, max: 100 },
    brush: {
      toolbox: ['rect', 'polygon', 'lineX', 'keep', 'clear'], // buttons added to the toolbox
      xAxisIndex: 0,
      yAxisIndex: 0,
      brushMode: 'multiple', // allow several areas (hold Ctrl/Shift is not required)
      throttleType: 'debounce',
      throttleDelay: 100,
      // Points inside a selection vs outside it.
      inBrush: { color: '#ffb74d', opacity: 1 },
      outOfBrush: { color: '#7a8aa0', opacity: 0.35 },
    },
    toolbox: { show: !ctx.preview, feature: { brush: { type: ['rect', 'polygon', 'lineX', 'keep', 'clear'] } } },
    series: [{ type: 'scatter', data: points, symbolSize: 10 }],
  });

  const count = (params: { batch: { selected: { dataIndex: number[] }[] }[] }): number =>
    params.batch[0]?.selected.reduce((n, s) => n + s.dataIndex.length, 0) ?? 0;
  chart.on('brushSelected', (p) => {
    const n = count(p as Parameters<typeof count>[0]);
    if (ctx.preview) chart.setOption({ title: { text: `selected: ${n}` } });
    else readout.textContent = n ? `${n} of ${points.length} points selected` : 'Nothing selected.';
  });

  if (bar) {
    button(bar, 'Select a box', () =>
      chart.dispatchAction({ type: 'brush', areas: [{ brushType: 'rect', xAxisIndex: 0, yAxisIndex: 0, coordRange: [[20, 60], [30, 80]] }] }),
    );
    button(bar, 'Select an x band', () =>
      chart.dispatchAction({ type: 'brush', areas: [{ brushType: 'lineX', xAxisIndex: 0, coordRange: [50, 90] }] }),
    );
    button(bar, 'Clear', () => chart.dispatchAction({ type: 'brush', areas: [] }));
  }

  // Both: sweep a programmatic rect across the plot.
  let x = 0;
  const stop = ctx.preview
    ? every(250, () => {
        x = (x + 5) % 80;
        chart.dispatchAction({ type: 'brush', areas: [{ brushType: 'rect', xAxisIndex: 0, yAxisIndex: 0, coordRange: [[x, x + 25], [10, 90]] }] });
      })
    : () => {};

  return () => {
    stop();
    dispose();
  };
};

export default mount;
