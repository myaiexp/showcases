// sequenceAnalysis in step mode: users as rows, steps as columns, patternData links and their isExtend
import type { Mount } from '@/types.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { select } from '../../shared/chart.ts';
import { analysisSpec } from '../../shared/ext-sequence-data.ts';

type Extend = 'both ends' | 'left' | 'right';
const OPTIONS: Extend[] = ['both ends', 'left', 'right'];
const toProp = (e: Extend): 'left' | 'right' | undefined => (e === 'both ends' ? undefined : e);

const mount: Mount = (el, ctx) =>
  mountLive<{ extend: Extend }>(el, ctx, {
    initial: { extend: 'both ends' },
    // The full extension spec is rebuilt on every change: updateSpec needs the whole thing, never getSpec().
    build: (s, preview) => analysisSpec({ mode: 'step', height: preview ? 200 : 380, extend: toProp(s.extend) }),
    controls(bar, live) {
      select(bar, 'patternData.isExtend', OPTIONS, (v) => live.set({ extend: v as Extend }));
    },
    step: (_, i) => ({ extend: OPTIONS[i % 3] as Extend }),
    previewMs: 2000,
    mode: 'rebuild',
    chart: { height: 380 },
  });

export default mount;
