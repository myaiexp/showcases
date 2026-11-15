// globe-gl example: Render: lineHoverPrecision
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Render: lineHoverPrecision",
  summary:
    "Hairline paths (no pathStroke) are drawn as 1px lines, which are hard to hit. lineHoverPrecision widens the zone around lines and particle points that counts as a hover (0.2 by default): at 5 the pointer catches a parallel from several degrees away.",
  section: "Render Control",
  tags: ["lineHoverPrecision", "pathsData", "onPathHover"],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
