// FAQ: clear the brush box when the drag ends, from the brushEnd event
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, readout, select } from '../../shared/chart.ts';
import { line, scatterPoints, simulateDrag } from '../../shared/components-data.ts';

const spec: ISpec = {
  type: 'scatter',
  data: [{ id: 'p', values: scatterPoints(60, 29) }],
  xField: 'x',
  yField: 'y',
  seriesField: 'type',
  axes: [{ orient: 'left', type: 'linear' }, { orient: 'bottom', type: 'linear' }],
  legends: { visible: false },
  brush: { brushType: 'rect', inBrush: { colorAlpha: 1 }, outOfBrush: { colorAlpha: 0.2 } },
};

interface BrushPart {
  _container?: { incrementalClearChild?: () => void };
}
interface Component {
  name?: string;
  _brushComponents?: BrushPart[];
}

const mount: Mount = (el, ctx) => {
  const { vchart, release, container } = createChart(el, ctx, spec);
  let clear = true;
  const out = ctx.preview ? null : readout(el);
  if (out) out.textContent = 'Drag a box on the chart.';

  vchart.on('brushEnd', (e) => {
    const n = (e as { value?: { inBrushData?: unknown[] } }).value?.inBrushData?.length ?? 0;
    if (out) out.textContent = `brushEnd: ${n} points inside${clear ? ', box cleared' : ', box kept'}`;
    if (!clear) return;
    // There is no clear-brush API in 2.2: empty each brush part's container, as the FAQ shows.
    // The component list is read here, not cached, because updateSpec rebuilds components.
    for (const c of (vchart.getChart()?.getAllComponents() ?? []) as unknown as Component[]) {
      if (c.name === 'brush') c._brushComponents?.forEach((b) => b._container?.incrementalClearChild?.());
    }
  });

  if (!ctx.preview) {
    const bar = controlBar(el);
    el.prepend(bar);
    select(bar, 'at brushEnd', ['clear the box', 'keep the box'], (v) => (clear = v === 'clear the box'));
  }

  let released = false;
  let cancel = (): void => {};
  if (ctx.preview) {
    let i = 0;
    const next = (): void => {
      if (released) return;
      i += 1;
      const dx = (i % 3) * 0.12;
      cancel = simulateDrag(container, line([0.25 + dx, 0.3], [0.5 + dx, 0.7]), { holdMs: 900, onDone: next });
    };
    next();
  }
  return () => {
    released = true;
    cancel();
    release();
  };
};

export default mount;
