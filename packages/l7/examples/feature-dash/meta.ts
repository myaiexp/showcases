// l7 example: Feature dash: lineType and dashArray
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Feature dash: lineType and dashArray",
  summary:
    "lineType: 'dash' with dashArray [len1, len2] draws len1 solid then len2 empty. The lines are coloured by a category field and active() highlights the one you hover.",
  section: "Layer: Features",
  tags: ["dash","lineType","dashArray","active","color"],
  docs: ["repo/site/docs/api/common/features/dash.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
