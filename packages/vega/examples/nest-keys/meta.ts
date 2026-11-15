// vega example: Nest: Keys
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Nest: Keys",
  summary:
    "Sixteen orders nested by different key lists: region, region then product, product then region, each laid out as a tree.",
  section: "Transforms: Hierarchy",
  tags: ["transform.nest.keys", "transform.nest.generate", "transform.tree"],
  docs: ["repo/docs/docs/transforms/nest.md", "repo/docs/docs/transforms/tree.md", "repo/docs/docs/transforms/treelinks.md", "repo/docs/docs/transforms/linkpath.md", "repo/docs/docs/transforms/nest.vg.json"],
  provenance: 'pure',
  added: '2026-11-15',
});
