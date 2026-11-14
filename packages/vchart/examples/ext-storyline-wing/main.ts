// Storyline wing layout: circular images along a wing path, anchored left or right
import type { Mount } from '@/types.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { select, slider, type ISpec } from '../../shared/chart.ts';
import { storyNodes } from '../../shared/ext-data.ts';
import { TITLE } from '../../shared/ext-storyline.ts';

interface State {
  direction: 'left' | 'right';
  radius: number;
  path: boolean;
}

const mount: Mount = (el, ctx) =>
  mountLive<State>(el, ctx, {
    initial: { direction: 'left', radius: 0.92, path: true },
    build: (s, preview) =>
      ({
        type: 'storyline',
        animation: false,
        layout: { type: 'wing', direction: s.direction, radiusRatio: s.radius },
        themeColor: '#2f9e6b',
        // The card is small, so its images are too; the full view keeps the layout's own sizes.
        ...(preview ? { image: { width: 56, height: 56 } } : {}),
        line: { visible: s.path, style: { fill: 'rgba(47,158,107,0.28)' } },
        title: { style: { fontSize: preview ? 10 : 16, ...TITLE } },
        content: { visible: !preview, style: { fontSize: 12, lineHeight: 17, fill: '#b7bdc9' } },
        data: storyNodes(preview ? 3 : 4),
      }) as unknown as ISpec,
    controls(bar, live) {
      select(bar, 'direction', ['left', 'right'], (v) => live.set({ direction: v as State['direction'] }));
      slider(bar, 'radiusRatio', [0.6, 1.1, 0.02], 0.92, (v) => live.set({ radius: v }));
      select(bar, 'line.visible', ['true', 'false'], (v) => live.set({ path: v === 'true' }));
    },
    step: (_, i) => ({ direction: i % 2 ? 'right' : 'left' }),
    previewMs: 2200,
    mode: 'rebuild',
    chart: { height: 600, previewHeight: 200 },
  });

export default mount;
