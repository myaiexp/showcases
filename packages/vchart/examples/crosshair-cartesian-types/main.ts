// Cartesian crosshair: xField / yField, line or rect auxiliary graphics
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, controlBar, select, every } from '../../shared/chart.ts';
import { dimensionTour, groupedRows, QUARTERS } from '../../shared/components-data.ts';

type Shape = 'rect' | 'line';

const lineSpec = (shape: Shape, color: string) =>
  shape === 'rect'
    ? { type: 'rect' as const, style: { fill: color, fillOpacity: 0.18 } }
    : { type: 'line' as const, style: { stroke: color, lineWidth: 1, lineDash: [4, 4] } };

const build = (x: Shape, y: Shape | 'off'): ISpec => ({
  type: 'line',
  data: [{ id: 'trend', values: groupedRows(QUARTERS, ['North', 'South'], 41) }],
  xField: 'x',
  yField: 'y',
  seriesField: 'c',
  legends: { visible: true, orient: 'top' },
  crosshair: {
    xField: { visible: true, line: lineSpec(x, '#38bdf8') },
    yField: { visible: y !== 'off', line: lineSpec(y === 'rect' ? 'rect' : 'line', '#f59e0b') },
  },
});

const mount: Mount = (el, ctx) => {
  let x: Shape = 'rect';
  let y: Shape | 'off' = 'off';
  const { vchart, release } = createChart(el, ctx, build(x, y));
  let released = false;
  const apply = (): void => {
    if (!released) void vchart.updateSpec(build(x, y));
  };

  let stopTour = (): void => {};
  let stopCycle = (): void => {};
  if (ctx.preview) {
    // setDimensionIndex moves the crosshair without a pointer; the variants rotate underneath it.
    stopTour = dimensionTour(vchart, QUARTERS, 900, { tooltip: false });
    let i = 0;
    stopCycle = every(3600, () => {
      i += 1;
      x = i % 2 ? 'line' : 'rect';
      y = i % 3 === 0 ? 'line' : 'off';
      apply();
    });
  } else {
    const bar = controlBar(el);
    select(bar, 'xField.line.type', ['rect', 'line'], (v) => ((x = v as Shape), apply()));
    select(bar, 'yField', ['off', 'line', 'rect'], (v) => ((y = v as Shape | 'off'), apply()));
    el.prepend(bar);
  }

  return () => {
    stopTour();
    stopCycle();
    released = true;
    release();
  };
};

export default mount;
