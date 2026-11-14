// Storyline arc layout: direction up or down, with a tunable radius ratio
import type { Mount } from '@/types.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { select, slider, type ISpec } from '../../shared/chart.ts';
import { storyNodes, svgImage } from '../../shared/ext-data.ts';
import { TITLE } from '../../shared/ext-storyline.ts';

interface State {
  direction: 'up' | 'down';
  radius: number;
  sweep: number;
}

const mount: Mount = (el, ctx) =>
  mountLive<State>(el, ctx, {
    initial: { direction: 'up', radius: 0.8, sweep: 100 },
    build(s, preview) {
      // A dome sweeps 200 to 340 degrees, a bowl 20 to 160; the sweep slider widens either around its middle.
      const mid = s.direction === 'up' ? 270 : 90;
      return {
        type: 'storyline',
        animation: false,
        layout: { type: 'arc', direction: s.direction, radiusRatio: s.radius, startAngle: mid - s.sweep / 2, endAngle: mid + s.sweep / 2 },
        themeColor: '#7b61d9',
        line: { visible: true },
        // The theme image the arc wraps around: bottom for a dome, top for a bowl.
        titleImage: { image: svgImage('Story', 260, 320, 160), width: preview ? 80 : 200, height: preview ? 50 : 120 },
        title: { style: { fontSize: preview ? 10 : 16, fill: '#e6e8ee', ...TITLE } },
        content: { visible: !preview, style: { fontSize: 12, lineHeight: 17, fill: '#b7bdc9' } },
        data: storyNodes(preview ? 3 : 4),
        padding: preview ? [20, 10, 14, 10] : [180, 120, 150, 120],
      } as unknown as ISpec;
    },
    controls(bar, live) {
      select(bar, 'direction', ['up', 'down'], (v) => live.set({ direction: v as State['direction'] }));
      slider(bar, 'radiusRatio', [0.6, 1.1, 0.02], 0.8, (v) => live.set({ radius: v }));
      slider(bar, 'sweep (degrees)', [40, 160, 10], 100, (v) => live.set({ sweep: v }));
    },
    step: (_, i) => ({ direction: i % 2 ? 'down' : 'up', radius: 0.8 }),
    previewMs: 2200,
    mode: 'rebuild',
    chart: { height: 560, previewHeight: 200 },
  });

export default mount;
