// l7 example: Dashed path
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Dashed path",
  summary:
    "A path becomes dashed with lineType: 'dash' and dashArray [5, 5]: five units solid, five empty. Colours come from the 'type' field.",
  section: "Tutorial: Line",
  tags: ["lineType","dashArray","line","color"],
  docs: ["repo/site/docs/tutorial/line/path.en.md","repo/site/docs/api/common/features/dash.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
