// @pn.Mirror makes a bar chart that rises and falls
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Mirror: the middle is not repeated",
  summary: "@Mirror(20%, 40%, 60%, 80%, 100%) goes up and comes back down without repeating the peak, which makes nine bars of a symmetric hill. The cells are centered with align-self and take their height from the list.",
  section: "Values",
  tags: ["@Mirror","@pn","height"],
  docs: ["pages/css-doodle-com/reference/function-mirror.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
