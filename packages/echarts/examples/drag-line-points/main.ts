// Draggable line points: invisible graphic circles over the symbols drive series.data
import type { Mount } from '@/types.ts';
import { createChart, every } from '../../shared/chart.ts';

const SYMBOL = 20;

const mount: Mount = (el, ctx) => {
  const { chart, container, dispose } = createChart(el, ctx);
  const data: number[][] = [[15, 0], [-50, 10], [-56.5, 20], [-46.5, 30], [-22.1, 40]];

  chart.setOption({
    // triggerOn 'none': the tooltip only shows when the code below asks for it.
    tooltip: {
      triggerOn: 'none',
      formatter: (p: { data: number[] }) => `X: ${p.data[0]!.toFixed(2)}<br>Y: ${p.data[1]!.toFixed(2)}`,
    },
    grid: ctx.preview ? { top: 10, bottom: 22, left: 34, right: 10 } : undefined,
    xAxis: { min: -100, max: 80, type: 'value', axisLine: { onZero: false } },
    yAxis: { min: -30, max: 60, type: 'value', axisLine: { onZero: false } },
    series: [{ id: 'a', type: 'line', smooth: true, symbolSize: ctx.preview ? 12 : SYMBOL, data }],
  });

  /** convertToPixel only works after the first setOption has built the grid. */
  const pixel = (item: number[]): number[] => chart.convertToPixel('grid', item) as number[];

  // Line symbols are not draggable, so one invisible, draggable circle sits on each.
  const handles = (): void => {
    chart.setOption({
      graphic: data.map((item, dataIndex) => {
        const [x, y] = pixel(item);
        return {
          type: 'circle',
          shape: { r: SYMBOL / 2 },
          x,
          y,
          invisible: true,
          draggable: true,
          z: 100,
          // Called repeatedly while dragging: the circle's position back to data, then
          // the series redrawn from the updated array.
          ondrag(this: { x: number; y: number }) {
            data[dataIndex] = chart.convertFromPixel('grid', [this.x, this.y]) as number[];
            chart.setOption({ series: [{ id: 'a', data }] });
            chart.dispatchAction({ type: 'showTip', seriesIndex: 0, dataIndex });
          },
          onmousemove: () => chart.dispatchAction({ type: 'showTip', seriesIndex: 0, dataIndex }),
          onmouseout: () => chart.dispatchAction({ type: 'hideTip' }),
        };
      }),
    });
  };
  handles();

  // The handles are in pixels, so they are re-placed whenever the canvas size changes
  // (createChart's own observer does the resize). A detached container measures 0×0.
  const observer = new ResizeObserver(() => {
    if (container.clientWidth === 0 || container.clientHeight === 0) return;
    chart.resize();
    handles();
  });
  observer.observe(container);

  // The preview has no pointer: nudge the points the way a drag would.
  let t = 0;
  const stop = ctx.preview
    ? every(120, () => {
        t += 0.12;
        data.forEach((item, i) => {
          item[0] = -40 + 45 * Math.sin(t + i * 0.9);
        });
        chart.setOption({ series: [{ id: 'a', data }] });
        handles();
      })
    : () => {};

  return () => {
    stop();
    observer.disconnect();
    dispose();
  };
};

export default mount;
