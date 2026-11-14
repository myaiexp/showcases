// Storyline helpers: one mount for the five layouts, with a preview that drops the descriptions
import VChart from '@visactor/vchart';
import { registerStorylineChart } from '@visactor/vchart-extension';
import type { MountContext } from '@/types.ts';
import { mountLive } from './live-spec.ts';
import { select, slider, type ISpec } from './chart.ts';
import { storyNodes } from './ext-data.ts';

// The guide passes the page's VChart to the registration call.
registerStorylineChart({ VChart });

export interface StoryState {
  count: number;
  themeColor: string;
  extra: number;
}

export interface StoryOptions {
  /** The storyline `layout` option for the given extra control (e.g. radiusRatio), as a string or object. */
  layout: (s: StoryState) => unknown;
  /** Fill for the node titles; leave out to keep the layout's own (clock and wing use themeColor). */
  titleFill?: string;
  /** Other top-level spec keys, built from the state. */
  spec?: (s: StoryState, preview: boolean) => Record<string, unknown>;
  /** Label and range of the extra slider (full view), if the layout has a tunable number. */
  extra?: { label: string; range: [number, number, number]; value: number };
  /** Preview-only node count. */
  previewCount?: number;
  height?: number;
}

/** The default title is dark with a white stroke, which glares on the dark page. */
export const TITLE = { stroke: '#0c0d11', lineWidth: 3 };
const COLORS: Record<string, string> = { coral: '#e8543d', teal: '#3b82a0', violet: '#7b61d9', green: '#2f9e6b' };

export function mountStoryline(el: HTMLElement, ctx: MountContext, o: StoryOptions): () => void {
  const names = Object.keys(COLORS);
  return mountLive<StoryState>(el, ctx, {
    initial: { count: 4, themeColor: COLORS['teal'] as string, extra: o.extra?.value ?? 0 },
    build(s, preview) {
      const n = preview ? (o.previewCount ?? 3) : s.count;
      return {
        type: 'storyline',
        animation: false,
        layout: o.layout(s),
        themeColor: s.themeColor,
        // The cards are small: keep titles, shorten the node list and drop the long descriptions.
        title: { style: { fontSize: preview ? 11 : 18, ...TITLE, ...(o.titleFill ? { fill: o.titleFill } : {}) } },
        content: { visible: !preview, style: { fontSize: 13, lineHeight: 19, fill: '#b7bdc9' } },
        data: storyNodes(n),
        ...o.spec?.(s, preview),
      } as unknown as ISpec;
    },
    controls(bar, live) {
      select(bar, 'nodes', ['3', '4', '5'], (v) => live.set({ count: Number(v) })).value = '4';
      select(bar, 'themeColor', names, (v) => live.set({ themeColor: COLORS[v] as string })).value = 'teal';
      if (o.extra) slider(bar, o.extra.label, o.extra.range, o.extra.value, (v) => live.set({ extra: v }));
    },
    step: (_, i) => ({ themeColor: COLORS[names[i % names.length] as string] as string }),
    previewMs: 1800,
    mode: 'rebuild',
    chart: { height: o.height ?? 520, previewHeight: 200 },
  });
}
