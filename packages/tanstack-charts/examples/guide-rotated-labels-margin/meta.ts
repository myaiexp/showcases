// tanstack-charts example: Rotated labels and automatic margins
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Rotated labels and automatic margins',
  summary:
    'Rotation is explicit and independent of thinning, but it takes part in layout: rotated tick bounds, first and last label overhang and the font size all feed the automatic margins. Turn the rotation slider and watch the bottom margin in the readout grow and shrink with the label bounds.',
  section: 'Scales, Guides, and Color',
  tags: ['axis.tickLabels.rotate', 'scene.margin', 'automatic margins'],
  docs: ['repo/docs/reference/scales-guides-and-color.md', 'repo/docs/reference/marks/bar-and-rect.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
