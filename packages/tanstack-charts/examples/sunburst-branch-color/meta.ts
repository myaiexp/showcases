// tanstack-charts example: Branch color and node colors
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Branch color and node colors",
  summary:
    "color: 'branchId' paints a top-level branch and everything under it in one color. Switching the color callback to depth or to leaf-versus-folder shows what else the node fields can drive.",
  section: "Sunburst Mark",
  tags: ['sunburst', 'branchId', 'color', 'depth', 'external'],
  docs: ['repo/docs/reference/marks/sunburst.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
