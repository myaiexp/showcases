// brush.zoomAfterBrush: drag a rectangle and the axes zoom to it
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { button, controlBar, createChart, every, type Chart } from '../../shared/chart.ts';
import { line, scatterPoints, simulateDrag } from '../../shared/components-data.ts';

const spec: ISpec = {
  type: 'scatter',
  data: [{ id: 'd', values: scatterPoints(120, 31) }],
  xField: 'x',
  yField: 'y',
  seriesField: 'type',
  axes: [
    { orient: 'left', type: 'linear' },
    { orient: 'bottom', type: 'linear' },
  ],
  legends: { visible: false },
  brush: {
    brushType: 'rect',
    zoomAfterBrush: true,
    axisRangeExpand: 0.05,
    style: { fill: '#fbbf24', fillOpacity: 0.15, stroke: '#fbbf24' },
  },
};

const mount: Mount = (el, ctx) => {
  let chart: Chart = createChart(el, ctx, spec);
  let cancel = (): void => {};
  let alive = true;
  // Zoom state lives in the axes, so a reset is a fresh instance.
  const rebuild = (): void => {
    cancel();
    chart.release();
    chart = createChart(el, ctx, spec);
  };
  let stop = (): void => {};
  if (ctx.preview) {
    const drag = (): void => {
      cancel = simulateDrag(chart.container, line([0.25, 0.25], [0.6, 0.65]), { holdMs: 1300 });
    };
    drag();
    stop = every(3600, () => {
      if (!alive) return;
      rebuild();
      drag();
    });
  } else {
    const bar = controlBar(el);
    el.prepend(bar);
    button(bar, 'reset zoom', rebuild);
  }
  return () => {
    stop();
    alive = false;
    cancel();
    chart.release();
  };
};

export default mount;
