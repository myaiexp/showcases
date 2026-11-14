// sequenceAnalysis in time mode: actionData links, with or without midpoint avatars and target arrows
import type { Mount } from '@/types.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { select } from '../../shared/chart.ts';
import { analysisSpec } from '../../shared/ext-sequence-data.ts';

const mount: Mount = (el, ctx) =>
  mountLive<{ target: boolean }>(el, ctx, {
    initial: { target: true },
    build: (s, preview) => analysisSpec({ mode: 'time', actionTarget: s.target, height: preview ? 200 : 380 }),
    controls(bar, live) {
      select(bar, 'actionTarget', ['true', 'false'], (v) => live.set({ target: v === 'true' }));
    },
    step: (_, i) => ({ target: i % 2 === 0 }),
    previewMs: 2200,
    mode: 'rebuild',
    chart: { height: 380 },
  });

export default mount;
