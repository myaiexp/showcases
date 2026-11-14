// The timeline chart, horizontal: label position and arrow thickness as live settings
import type { Mount } from '@/types.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { select, slider } from '../../shared/chart.ts';
import { timelineSpec } from '../../shared/ext-timeline.ts';

const POSITIONS = ['top-bottom', 'bottom-top', 'top', 'bottom'];

const mount: Mount = (el, ctx) =>
  mountLive<{ pos: string; thickness: number }>(el, ctx, {
    initial: { pos: 'top-bottom', thickness: 14 },
    build: (s, preview) => timelineSpec({ direction: 'horizontal', labelPosition: s.pos, arrowThickness: s.thickness, preview }),
    controls(bar, live) {
      select(bar, 'labelPosition', POSITIONS, (v) => live.set({ pos: v }));
      slider(bar, 'arrow.thickness', [4, 30, 2], 14, (v) => live.set({ thickness: v }));
    },
    step: (_, i) => ({ pos: POSITIONS[i % POSITIONS.length] as string }),
    previewMs: 1800,
    mode: 'rebuild',
    chart: { height: 340 },
  });

export default mount;
