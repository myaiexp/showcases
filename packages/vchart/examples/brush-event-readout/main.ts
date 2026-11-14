// Brush events: brushStart, brushChange, brushEnd and the data inside the box
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, readout } from '../../shared/chart.ts';
import { line, scatterPoints, simulateDrag } from '../../shared/components-data.ts';

const data = scatterPoints(60, 53);

const spec: ISpec = {
  type: 'scatter',
  data: [{ id: 'points', values: data }],
  xField: 'x',
  yField: 'y',
  seriesField: 'type',
  sizeField: 'size',
  size: [6, 18],
  axes: [
    { orient: 'left', type: 'linear' },
    { orient: 'bottom', type: 'linear' },
  ],
  legends: { visible: true, orient: 'top' },
  brush: { brushType: 'rect', inBrush: { colorAlpha: 1 }, outOfBrush: { colorAlpha: 0.15 } },
};

interface BrushEvent {
  value?: { operateType?: string; inBrushData?: { type: string; x: number; y: number }[]; outOfBrushData?: unknown[] };
}

const mount: Mount = (el, ctx) => {
  const { vchart, release, container } = createChart(el, ctx, spec);
  let released = false;

  // Full view: a readout of the three events. A preview card has no room for text.
  const out = ctx.preview ? undefined : readout(el);
  if (out) out.textContent = 'Drag a box on the chart.';
  const log = (name: string, e: unknown): void => {
    const v = (e as BrushEvent).value;
    const inside = v?.inBrushData ?? [];
    const byType = new Map<string, number>();
    for (const d of inside) byType.set(d.type, (byType.get(d.type) ?? 0) + 1);
    if (out) {
      out.textContent = `${name}: ${v?.operateType ?? ''} | ${inside.length} points inside, ${v?.outOfBrushData?.length ?? 0} outside | ${[...byType].map(([k, n]) => `${k} ${n}`).join(', ')}`;
    }
  };
  vchart.on('brushStart', (e) => log('brushStart', e));
  vchart.on('brushChange', (e) => log('brushChange', e));
  vchart.on('brushEnd', (e) => log('brushEnd', e));

  let stop = (): void => {};
  if (ctx.preview) {
    // Drag a box across the points now and then.
    let cancel = (): void => {};
    let i = 0;
    const next = (): void => {
      if (released) return;
      i += 1;
      const dx = (i % 3) * 0.12;
      cancel = simulateDrag(container, line([0.22 + dx, 0.3], [0.5 + dx, 0.7]), { holdMs: 1400, onDone: next });
    };
    next();
    stop = () => cancel();
  }

  return () => {
    stop();
    released = true;
    release();
  };
};

export default mount;
