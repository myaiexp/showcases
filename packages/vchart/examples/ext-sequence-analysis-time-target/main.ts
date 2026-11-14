// sequenceAnalysis in time mode: actionData links, with or without midpoint avatars and target arrows
import type { Mount } from '@/types.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { select, type ISpec } from '../../shared/chart.ts';
import { USER_IMAGES, actionData, eventData, keepLinks, tuneConverted } from '../../shared/ext-sequence-data.ts';

const mount: Mount = (el, ctx) =>
  mountLive<{ target: boolean }>(el, ctx, {
    initial: { target: true },
    build: (s, preview) =>
      ({
        type: 'sequenceAnalysis',
        mode: 'time',
        mediumConnection: false,
        // true: each link gets an avatar at its midpoint and an arrow at its end (links then carry user_id and user_image).
        actionTarget: s.target,
        height: preview ? 200 : 380,
        animation: false,
        eventData: eventData(0, preview ? 2 : 3),
        actionData: keepLinks(actionData(s.target), preview ? 2 : 3),
        patternData: [],
        userImageMap: USER_IMAGES,
        stepMediumMap: {},
        customTransformSpec(converted: Record<string, unknown>) {
          tuneConverted(converted, preview);
        },
      }) as unknown as ISpec,
    controls(bar, live) {
      select(bar, 'actionTarget', ['true', 'false'], (v) => live.set({ target: v === 'true' }));
    },
    step: (_, i) => ({ target: i % 2 === 0 }),
    previewMs: 2200,
    mode: 'rebuild',
    chart: { height: 380 },
  });

export default mount;
