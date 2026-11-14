// Updating sequenceAnalysis: keep the whole extension spec and send it again with updateSpecSync
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every, readout, type ISpec } from '../../shared/chart.ts';
import { USER_IMAGES, actionData, eventData, keepLinks, tuneConverted } from '../../shared/ext-sequence-data.ts';

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const users = ctx.preview ? 2 : 3;
  let shift = 0;
  const out = ctx.preview ? null : readout(el);
  // The saved extension spec: getSpec() returns the converted common chart, which is no substitute.
  const base = {
    type: 'sequenceAnalysis',
    mode: 'time',
    mediumConnection: false,
    actionTarget: false,
    height: ctx.preview ? 200 : 380,
    animation: false,
    eventData: eventData(shift, users),
    actionData: keepLinks(actionData(false), users),
    patternData: [],
    userImageMap: USER_IMAGES,
    stepMediumMap: {},
    customTransformSpec(converted: Record<string, unknown>) {
      tuneConverted(converted, ctx.preview);
    },
  } as unknown as ISpec;
  const { vchart, release } = createChart(el, ctx, base, { previewHeight: 200, height: 380 });

  let alive = true;
  const advance = (): void => {
    if (!alive) return;
    shift += 1;
    vchart.updateSpecSync({ ...base, eventData: eventData(shift, users) } as never);
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
