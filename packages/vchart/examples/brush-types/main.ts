// Brush brushType: x, y, rect or polygon selection boxes, in single or multiple brushMode
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, controlBar, select } from '../../shared/chart.ts';
import { line, scatterPoints, simulateDrag } from '../../shared/components-data.ts';

const TYPES = ['rect', 'x', 'y', 'polygon'] as const;
type BrushType = (typeof TYPES)[number];
const data = scatterPoints(70, 29);

const build = (brushType: BrushType, brushMode: 'single' | 'multiple'): ISpec => ({
  type: 'scatter',
  data: [{ id: 'points', values: data }],
  xField: 'x',
  yField: 'y',
  seriesField: 'type',
  axes: [
    { orient: 'left', type: 'linear' },
    { orient: 'bottom', type: 'linear' },
  ],
  legends: { visible: true, orient: 'top' },
  brush: { brushType, brushMode, inBrush: { colorAlpha: 1 }, outOfBrush: { colorAlpha: 0.15 } },
});

/** Where the drag goes for each type, as fractions of the canvas. */
const PATHS: Record<BrushType, [number, number][]> = {
  rect: line([0.25, 0.35], [0.6, 0.75]),
  x: line([0.3, 0.5], [0.65, 0.5]),
  y: line([0.5, 0.3], [0.5, 0.65]),
  polygon: [...line([0.3, 0.4], [0.6, 0.35], 6), ...line([0.6, 0.35], [0.7, 0.7], 6), ...line([0.7, 0.7], [0.35, 0.65], 6), ...line([0.35, 0.65], [0.3, 0.4], 6)],
};

const mount: Mount = (el, ctx) => {
  const { vchart, release, container } = createChart(el, ctx, build('rect', 'single'));
  let released = false;

  let stop = (): void => {};
  let stopDrag = (): void => {};
  if (ctx.preview) {
    // Draw each kind of box with dispatched pointer events, then rebuild the chart to clear it.
    let i = 0;
    const next = (): void => {
      if (released) return;
      const type = TYPES[i % TYPES.length] as BrushType;
      i += 1;
      void vchart.updateSpec(build(type, 'single')).then(() => {
        if (released) return;
        stopDrag = simulateDrag(container, PATHS[type], { stepMs: 40, holdMs: 1500, onDone: next });
      });
    };
    next();
    stop = () => stopDrag();
  } else {
    const bar = controlBar(el);
    let type: BrushType = 'rect';
    let mode: 'single' | 'multiple' = 'single';
    const apply = (): void => {
      if (!released) void vchart.updateSpec(build(type, mode));
    };
    select(bar, 'brushType', TYPES, (v) => ((type = v as BrushType), apply()));
    select(bar, 'brushMode', ['single', 'multiple'], (v) => ((mode = v as 'single' | 'multiple'), apply()));
    el.prepend(bar);
  }

  return () => {
    stop();
    released = true;
    release();
  };
};

export default mount;
