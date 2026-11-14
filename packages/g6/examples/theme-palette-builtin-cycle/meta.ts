// g6 example: Palette: built-in names cycle on 30 nodes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Palette: built-in names cycle on 30 nodes",
  summary: "node.palette set to spectral, tableau, oranges, greens or blues. Colours repeat when there are more nodes than colours.",
  section: 'Theme',
  tags: ["palette", "spectral", "tableau", "oranges", "greens", "blues"],
  docs: [
    "repo/packages/site/docs/manual/theme/palette.en.md",
    "repo/packages/site/common/manual/core-concept/palette/default-config.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
