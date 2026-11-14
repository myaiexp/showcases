// The timeline chart, vertical: time flows downward and labels take the left or right side
import type { Mount } from '@/types.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { select } from '../../shared/chart.ts';
import { timelineSpec } from '../../shared/ext-timeline.ts';

const POSITIONS = ['right-left', 'left-right', 'right', 'left'];

const mount: Mount = (el, ctx) =>
  mountLive<{ pos: string }>(el, ctx, {
    initial: { pos: 'right-left' },
    build: (s, preview) => timelineSpec({ direction: 'vertical', labelPosition: s.pos, preview }),
    controls(bar, live) {
      select(bar, 'labelPosition', POSITIONS, (v) => live.set({ pos: v }));
    },
    step: (_, i) => ({ pos: POSITIONS[i % POSITIONS.length] as string }),
    previewMs: 1800,
    mode: 'rebuild',
    chart: { height: 520 },
  });

export default mount;
