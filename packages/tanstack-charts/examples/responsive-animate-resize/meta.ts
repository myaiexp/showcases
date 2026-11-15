// tanstack-charts example: Animating a resize
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Animating a resize',
  summary:
    'A relayout commits at once by default, even when data updates animate. Setting svgAnimation.resize to true tweens the size change from the painted geometry. Toggle it and jump between two widths to compare the snap with the glide.',
  section: 'Responsive Charts',
  tags: ['svgAnimation', 'resize'],
  docs: ['repo/docs/guides/responsive-charts.md', 'repo/docs/guides/dynamic-data-and-animation.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
