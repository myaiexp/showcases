// Updating sequenceAnalysis: keep the whole extension spec and send it again with updateSpecSync
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every, readout } from '../../shared/chart.ts';
import { analysisSpec, eventData } from '../../shared/ext-sequence-data.ts';

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  let shift = 0;
  const out = ctx.preview ? null : readout(el);
  // The saved extension spec: getSpec() returns the converted common chart, which is no substitute.
  const base = analysisSpec({ mode: 'time', height: ctx.preview ? 200 : 380, shift });
  const { vchart, release } = createChart(el, ctx, base, { previewHeight: 200, height: 380 });

  let alive = true;
  const advance = (): void => {
    if (!alive) return;
    shift += 1;
    vchart.updateSpecSync({ ...base, eventData: eventData(shift) } as never);
    if (out) out.textContent = `shift = ${shift} days: eventData sent through updateSpecSync (updateDataSync would leave the top counts stale)`;
  };
  if (bar) button(bar, 'Shift events by a day', advance);
  const stop = bar ? () => {} : every(2200, advance);

  return () => {
    alive = false;
    stop();
    release();
  };
};

export default mount;
