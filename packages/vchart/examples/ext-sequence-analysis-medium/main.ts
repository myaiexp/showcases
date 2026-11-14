// sequenceAnalysis mediumConnection: step columns with straight links versus medium columns with curves
import type { Mount } from '@/types.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { select, type ISpec } from '../../shared/chart.ts';
import {
  STEP_MEDIUM, USER_IMAGES, eventData, keepLinks, patternData, tuneConverted,
} from '../../shared/ext-sequence-data.ts';

const mount: Mount = (el, ctx) =>
  mountLive<{ medium: boolean }>(el, ctx, {
    initial: { medium: true },
    build: (s, preview) =>
      ({
        type: 'sequenceAnalysis',
        mode: 'step',
        // true: columns are mediums joined by curves; false: columns are steps with straight links.
        mediumConnection: s.medium,
        actionTarget: false,
        height: preview ? 200 : 380,
        animation: false,
        eventData: eventData(0, preview ? 2 : 3),
        actionData: [],
        patternData: keepLinks(patternData(), preview ? 2 : 3),
        userImageMap: USER_IMAGES,
        // Only read when mediumConnection is off: the label above each step column.
        stepMediumMap: s.medium ? {} : STEP_MEDIUM,
        customTransformSpec(converted: Record<string, unknown>) {
          tuneConverted(converted, preview);
        },
      }) as unknown as ISpec,
    controls(bar, live) {
      select(bar, 'mediumConnection', ['true', 'false'], (v) => live.set({ medium: v === 'true' }));
    },
    step: (_, i) => ({ medium: i % 2 === 0 }),
    previewMs: 2200,
    mode: 'rebuild',
    chart: { height: 380 },
  });

export default mount;
