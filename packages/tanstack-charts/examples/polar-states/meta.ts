// tanstack-charts example: Focus states on a polar container
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Focus states on a polar container",
  summary:
    "polar.states supplies default focus states to its child marks: unmatched slices fade and the focused slice gets an outline. A child mark's own states array replaces the container default, and states: [] opts the arc out, which the checkbox demonstrates.",
  section: "Polar Marks",
  tags: ['tooltip format', 'polar', 'states', 'radialArc', 'focus', 'transition'],
  docs: ['repo/docs/guides/tooltips-and-focus.md', 'repo/docs/reference/marks/polar.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
