// tanstack-charts example: A custom ChartScale
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A custom ChartScale',
  summary:
    'ChartScale is the extension point for a mapping no compact or D3 scale provides. This one resolves a square-root axis by hand: it reads the values and pixel range from the resolve context, and returns the domain, map, invert, ticks and bandwidth. It is the last resort; the readout compares it to a D3 sqrt scale.',
  section: 'Scales, Guides, and Color',
  tags: ['ChartScale', 'resolve', 'ResolvedScale', 'ChartScaleResolveContext'],
  docs: ['repo/docs/reference/scales-guides-and-color.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
