// tanstack-charts example: Continuous viewport
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Continuous viewport',
  summary:
    'One long line with a viewport: the domain picks a 30-day window, translate shifts content in pixels, and the axes and grid stay fixed.',
  section: 'Layout, Axes, and Coordinates',
  tags: ['viewport.domain', 'viewport.translate', 'clip', 'scaleUtc'],
  docs: ['repo/docs/concepts/layout-axes-and-coordinates.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
