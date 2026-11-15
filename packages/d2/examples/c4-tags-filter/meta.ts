// d2 example: Filter imported models by class
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Filter imported models by class",
  summary:
    "A file of twenty models is imported, everything is suspended, and only models with the class customer-facing are unsuspended (`&class: customer-facing`). The second variant adds connections between the shapes that remain.",
  section: "C4",
  tags: ["import", "suspend", "&class", "tags"],
  docs: [
    "repo/blog/c4.md",
    "repo/static/d2/c4-models.d2",
    "repo/static/d2/c4-tags2.d2",
    "repo/static/d2/c4-tags3.d2",
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
