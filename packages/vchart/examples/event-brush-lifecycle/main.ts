// brushStart, brushChange, brushEnd and brushClear, counted
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, readout } from '../../shared/chart.ts';
import { line, scatterPoints, simulateDrag } from '../../shared/components-data.ts';

interface BrushEvent {
  value?: { operateType?: string; inBrushData?: unknown[]; zoomRecord?: unknown[] };
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { vchart, container, release } = createChart(el, ctx, {
    type: 'scatter',
    data: [{ id: 'points', values: scatterPoints(50, 21) }],
    xField: 'x',
    yField: 'y',
    seriesField: 'type',
    axes: [
      { orient: 'left', type: 'linear' },
      { orient: 'bottom', type: 'linear' },
    ],
    brush: { brushType: 'rect', inBrush: { colorAlpha: 1 }, outOfBrush: { colorAlpha: 0.15 } },
  } as never, { previewHeight: 150 });
  const out = readout(el);
  const counts: Record<string, number> = { brushStart: 0, brushChange: 0, brushEnd: 0, brushClear: 0 };
  let inside = 0;
  let last = '-';
  const show = (): void => {
    out.textContent = Object.entries(counts).map(([k, n]) => `${k}: ${n}`).join('   ') + `\nlast operateType: ${last}, ${inside} points in the box`;
  };
  for (const name of Object.keys(counts)) {
    vchart.on(name as 'brushStart', (e) => {
      counts[name] = (counts[name] ?? 0) + 1;
      const v = (e as BrushEvent).value;
      last = v?.operateType ?? last;
      if (name !== 'brushClear') inside = v?.inBrushData?.length ?? inside;
      else inside = 0;
      show();
    });
  }
  show();

  let released = false;
  let cancel = (): void => {};
  let i = 0;
  const drag = (): void => {
    if (released) return;
    i += 1;
    const dx = (i % 3) * 0.12;
    cancel = simulateDrag(container, line([0.2 + dx, 0.25], [0.5 + dx, 0.7]), { holdMs: 1200, onDone: ctx.preview ? drag : undefined });
  };
  if (ctx.preview) drag();
  else if (bar) {
    button(bar, 'Drag a box from code', drag);
    button(bar, 'Clear the box', () => {
      if (released) return;
      // Pointer down and up outside the box removes it, which fires brushClear.
      cancel = simulateDrag(container, [[0.9, 0.9], [0.9, 0.9]], { holdMs: 0 });
    });
  }

  return () => {
    released = true;
    cancel();
    release();
  };
};

export default mount;
