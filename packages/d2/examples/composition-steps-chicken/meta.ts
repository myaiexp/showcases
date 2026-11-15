// d2 example: Steps that build on each other
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Steps that build on each other",
  summary:
    "Each of the three steps adds one shape or connection and inherits everything from the step before, so step 3 shows the whole road though it declares only its last connection. The first variant animates all steps; the others render one step each.",
  section: "Composition",
  tags: ["steps", "animateInterval", "target"],
  docs: [
    "repo/docs/tour/steps.md",
    "repo/static/bespoke-d2/chicken.d2",
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
