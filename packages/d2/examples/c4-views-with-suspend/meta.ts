// d2 example: Views of a model with suspend
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Views of a model with suspend",
  summary:
    "`**: suspend` and `(** -> **)[*]: suspend` hide every shape and connection; `unsuspend` with glob filters brings back what a view needs. One view keeps connections whose `&src` or `&dst` is the API application; the other keeps root-level shapes (`&level: 0`) and adds three summary connections.",
  section: "C4",
  tags: ["suspend", "unsuspend", "globs", "&src", "&level"],
  docs: [
    "repo/blog/c4.md",
    "repo/static/d2/c4-view1.d2",
    "repo/static/d2/c4-view2.d2",
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
