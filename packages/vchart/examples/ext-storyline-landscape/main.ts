// Storyline landscape layout: images in a row, text above and below, a curve between them
import type { Mount } from '@/types.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { select, slider, type ISpec } from '../../shared/chart.ts';
import { storyNodes } from '../../shared/ext-data.ts';
import { COLORS, TITLE } from '../../shared/ext-storyline.ts';

interface State {
  count: number;
  themeColor: string;
  blockHeight: number;
}

const names = Object.keys(COLORS);

const mount: Mount = (el, ctx) =>
  mountLive<State>(el, ctx, {
    initial: { count: 4, themeColor: COLORS['teal'] as string, blockHeight: 320 },
    build: (s, preview) =>
      ({
        type: 'storyline',
        animation: false,
        layout: 'landscape',
        themeColor: s.themeColor,
        // The cards are small: keep titles, shorten the node list and drop the long descriptions.
        title: { style: { fontSize: preview ? 11 : 18, fill: '#e6e8ee', ...TITLE } },
        content: { visible: !preview, style: { fontSize: 13, lineHeight: 19, fill: '#b7bdc9' } },
        block: { height: preview ? 150 : s.blockHeight },
        data: storyNodes(preview ? 3 : s.count),
        padding: preview ? [8, 8, 30, 8] : [20, 90, 100, 20],
      }) as unknown as ISpec,
    controls(bar, live) {
      select(bar, 'nodes', ['3', '4', '5'], (v) => live.set({ count: Number(v) })).value = '4';
      select(bar, 'themeColor', names, (v) => live.set({ themeColor: COLORS[v] as string })).value = 'teal';
      slider(bar, 'block.height', [220, 380, 20], 320, (v) => live.set({ blockHeight: v }));
    },
    step: (_, i) => ({ themeColor: COLORS[names[i % names.length] as string] as string }),
    previewMs: 1800,
    mode: 'rebuild',
    chart: { height: 520, previewHeight: 200 },
  });

export default mount;
