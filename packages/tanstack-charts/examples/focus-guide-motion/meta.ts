// tanstack-charts example: Spring motion between focus targets
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Spring motion between focus targets",
  summary:
    "The guide's motion option sets a spring transition. With the optional motion() renderer the rule, marker and label move between targets and keep their velocity through rapid changes. Untick the box to see the same guide snap.",
  section: "Focus Guide Marks",
  tags: ['focusGuideX', 'motion', 'mountChartRenderer', 'spring'],
  docs: ['repo/docs/reference/marks/focus-guide.md', 'repo/docs/reference/motion.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
