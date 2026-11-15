// vega example: LinkPath: Require a Force Layout
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "LinkPath: Require a Force Layout",
  summary:
    "A force layout in a data set is bound to a signal, and linkpath requires that signal so links follow the nodes on every tick.",
  section: "Transforms: Layout",
  tags: ["transform.linkpath.require", "transform.force.signal"],
  docs: ["repo/docs/docs/transforms/linkpath.md", "repo/docs/docs/transforms/force.md", "repo/docs/docs/transforms/lookup.md", "repo/docs/docs/transforms.md", "repo/docs/docs/signals.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
