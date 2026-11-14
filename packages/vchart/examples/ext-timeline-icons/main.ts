// Timeline icons: iconField picks a built-in symbol per event; offsets move icon and title off the dot
import type { Mount } from '@/types.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { slider } from '../../shared/chart.ts';
import { timelineSpec } from '../../shared/ext-timeline.ts';

const mount: Mount = (el, ctx) =>
  mountLive<{ icon: number; title: number }>(el, ctx, {
    initial: { icon: 6, title: 6 },
    build: (s, preview) => timelineSpec({ direction: 'horizontal', labelPosition: 'top', icons: true, iconOffset: s.icon, titleOffset: s.title, preview }),
    controls(bar, live) {
      slider(bar, 'icon.offset', [-10, 30, 2], 6, (v) => live.set({ icon: v }));
      slider(bar, 'title.offset', [-10, 30, 2], 6, (v) => live.set({ title: v }));
    },
    step: (_, i) => ({ icon: [0, 12, 24][i % 3] as number, title: [0, 8, 16][i % 3] as number }),
    previewMs: 1500,
    mode: 'rebuild',
    chart: { height: 340 },
  });

export default mount;
