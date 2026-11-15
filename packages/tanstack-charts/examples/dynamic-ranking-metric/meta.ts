// tanstack-charts example: Rebuilding a definition from state
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Rebuilding a definition from state',
  summary:
    'The vanilla form of the memoized ranking chart: when the metric or accent color changes, a new definition is built from the current rows and passed to host.update. The tick count comes from the surface width inside the responsive builder, and svgAnimation tweens the change.',
  section: 'Dynamic Data and Animation',
  tags: ['defineChart', 'chart builder', 'host.update', 'svgAnimation'],
  docs: ['repo/docs/guides/dynamic-data-and-animation.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
