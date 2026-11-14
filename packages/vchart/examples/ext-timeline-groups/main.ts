// Timeline grouping: seriesField draws one timeline per track on a shared time scale
import type { Mount } from '@/types.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { select } from '../../shared/chart.ts';
import { timelineSpec } from '../../shared/ext-timeline.ts';

const mount: Mount = (el, ctx) =>
  mountLive<{ pos: string }>(el, ctx, {
    initial: { pos: 'top' },
    build: (s, preview) => timelineSpec({ direction: 'horizontal', labelPosition: s.pos, grouped: true, preview }),
    controls(bar, live) {
      select(bar, 'labelPosition', ['top', 'bottom', 'top-bottom'], (v) => live.set({ pos: v }));
    },
    step: (_, i) => ({ pos: ['top', 'bottom', 'top-bottom'][i % 3] as string }),
    previewMs: 1800,
    mode: 'rebuild',
    chart: { height: 400 },
  });

export default mount;
