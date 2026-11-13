// echarts example: Aria decals and description
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Aria decals and description',
  summary:
    'aria.enabled writes a generated description into the chart’s aria-label, and aria.decal adds patterns, default or custom, so slices differ by more than colour.',
  section: 'Best Practices',
  tags: ['aria', 'aria.decal', 'decals', 'aria-label', 'accessibility'],
  docs: [
    'repo/contents/en/best-practices/aria.md',
    'repo/en/option/component/aria.md',
    'repo/en/option/partial/decal.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
