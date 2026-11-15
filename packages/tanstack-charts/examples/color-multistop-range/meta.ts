// tanstack-charts example: Multi-stop continuous color range
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Multi-stop continuous color range',
  summary:
    'A D3 linear factory with a color.range of three colors gets evenly spaced domain stops across the inferred extent, so the ramp passes through each color in turn. A diverging look needs no separate scale family: dark blue, near white, then dark red, with the middle stop at the midpoint of the extent.',
  section: 'Scales, Guides, and Color',
  tags: ['color.range', 'scaleLinear', 'multi-stop', 'colorGradientLegend'],
  docs: ['repo/docs/reference/scales-guides-and-color.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
