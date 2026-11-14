// sequenceAnalysis mediumConnection: step columns with straight links versus medium columns with curves
import type { Mount } from '@/types.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { select } from '../../shared/chart.ts';
import { analysisSpec } from '../../shared/ext-sequence-data.ts';

const mount: Mount = (el, ctx) =>
  mountLive<{ medium: boolean }>(el, ctx, {
    initial: { medium: true },
    build: (s, preview) => analysisSpec({ mode: 'step', mediumConnection: s.medium, height: preview ? 200 : 380 }),
    controls(bar, live) {
      select(bar, 'mediumConnection', ['true', 'false'], (v) => live.set({ medium: v === 'true' }));
    },
    step: (_, i) => ({ medium: i % 2 === 0 }),
    previewMs: 2200,
    mode: 'rebuild',
    chart: { height: 380 },
  });

export default mount;
