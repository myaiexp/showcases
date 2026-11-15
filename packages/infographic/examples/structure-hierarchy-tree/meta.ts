// AntV Infographic example: Structure: HierarchyTree
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Structure: HierarchyTree",
  summary:
    "The HierarchyTree structure (id hierarchy-tree) draws a top-down tree with styled connection lines, chosen with a design block in the infographic syntax. The 5 steps change edgeType, edgeMarker, markerSize, edgeStyle, edgeCornerRadius, edgeColorMode, edgeWidth, colorMode, edgeOrigin and edgeOriginPadding under the structure line, so you see what each prop does. The full view prints the syntax being rendered.",
  section: "Built-in structures",
  tags: ['hierarchy-tree', 'design', 'edgeType', 'edgeMarker', 'markerSize', 'edgeStyle', 'edgeCornerRadius', 'edgeColorMode', 'edgeWidth', 'colorMode', 'edgeOrigin', 'edgeOriginPadding'],
  docs: [
    'repo/site/src/content/reference/built-in-structures.en.md',
    'repo/site/src/content/learn/design.en.md',
    'repo/site/src/content/reference/infographic-types.en.md',
    'repo/site/src/content/learn/infographic-syntax.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
