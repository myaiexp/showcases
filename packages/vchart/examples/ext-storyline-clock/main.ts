// Storyline clock layout: nodes clockwise around an orbit, geometry computed by the layout
import type { Mount } from '@/types.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { select, type ISpec } from '../../shared/chart.ts';
import { storyNodes } from '../../shared/ext-data.ts';
import { COLORS, TITLE } from '../../shared/ext-storyline.ts';

interface State {
  count: number;
  themeColor: string;
}

const names = Object.keys(COLORS);

const mount: Mount = (el, ctx) =>
  mountLive<State>(el, ctx, {
    initial: { count: 4, themeColor: COLORS['teal'] as string },
    build: (s, preview) =>
      ({
        type: 'storyline',
        animation: false,
        // The clock layout places every node itself; themeColor tints the orbit and the titles.
        layout: 'clock',
        themeColor: s.themeColor,
        title: { style: { fontSize: preview ? 11 : 18, ...TITLE } },
        content: { visible: !preview, style: { fontSize: 13, lineHeight: 19, fill: '#b7bdc9' } },
        data: storyNodes(preview ? 4 : s.count),
      }) as unknown as ISpec,
    controls(bar, live) {
      select(bar, 'nodes', ['3', '4', '5'], (v) => live.set({ count: Number(v) })).value = '4';
      select(bar, 'themeColor', names, (v) => live.set({ themeColor: COLORS[v] as string })).value = 'teal';
    },
    step: (_, i) => ({ themeColor: COLORS[names[i % names.length] as string] as string }),
    previewMs: 1800,
    mode: 'rebuild',
    chart: { height: 560, previewHeight: 200 },
  });

export default mount;
