// sequenceAnalysis in step mode: users as rows, steps as columns, patternData links and their isExtend
import type { Mount } from '@/types.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { select, type ISpec } from '../../shared/chart.ts';
import {
  STEP_MEDIUM, USER_IMAGES, eventData, keepLinks, patternData, tuneConverted,
} from '../../shared/ext-sequence-data.ts';

type Extend = 'both ends' | 'left' | 'right';
const OPTIONS: Extend[] = ['both ends', 'left', 'right'];
const toProp = (e: Extend): 'left' | 'right' | undefined => (e === 'both ends' ? undefined : e);

const mount: Mount = (el, ctx) =>
  mountLive<{ extend: Extend }>(el, ctx, {
    initial: { extend: 'both ends' },
    // The full extension spec is rebuilt on every change: updateSpec needs the whole thing, never getSpec().
    build: (s, preview) =>
      ({
        type: 'sequenceAnalysis',
        mode: 'step',
        mediumConnection: false,
        actionTarget: false,
        height: preview ? 200 : 380,
        animation: false,
        eventData: eventData(0, preview ? 2 : 3),
        actionData: [],
        // Each link may set isExtend: 'left' or 'right' to stretch only that end into its band.
        patternData: keepLinks(patternData(toProp(s.extend)), preview ? 2 : 3),
        userImageMap: USER_IMAGES,
        stepMediumMap: STEP_MEDIUM,
        customTransformSpec(converted: Record<string, unknown>) {
          tuneConverted(converted, preview);
        },
      }) as unknown as ISpec,
    controls(bar, live) {
      select(bar, 'patternData.isExtend', OPTIONS, (v) => live.set({ extend: v as Extend }));
    },
    step: (_, i) => ({ extend: OPTIONS[i % 3] as Extend }),
    previewMs: 2000,
    mode: 'rebuild',
    chart: { height: 380 },
  });

export default mount;
