// d2 example: Scenario: a hotfix deployment
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Scenario: a hotfix deployment",
  summary:
    "The base board is a normal deployment; the hotfix scenario inherits all of it and only fades the usual path, colours GitHub red and shows a dashed direct path to EC2. Animated, the SVG switches between the two boards.",
  section: "Composition",
  tags: ["scenarios", "opacity", "animateInterval"],
  docs: [
    "repo/docs/tour/scenarios.md",
    "repo/docs/tour/composition.md",
    "repo/static/bespoke-d2/animated.d2",
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
