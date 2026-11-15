// tanstack-charts example: Rest thresholds
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Rest thresholds',
  summary:
    'A spring is done when both its distance to the target is at most restDelta and its speed at most restSpeed, in the units of whatever it moves. The defaults are 0.005 and 0.01. These thresholds are absolute, not percentages, so larger values settle sooner. The slider changes restDelta and the readout shows the sample where the spring is declared done.',
  section: 'Motion',
  tags: ['createChartSpring', 'restDelta', 'restSpeed', 'sample.done'],
  docs: ['repo/docs/reference/motion.md', 'repo/docs/reference/marks/rules-links-arrows-vectors-and-ticks.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
