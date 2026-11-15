// 3d-force-graph example: Interaction: linkHoverPrecision
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Interaction: linkHoverPrecision",
  summary:
    "linkHoverPrecision sets how many graph units away from a thin link the pointer still hovers it. The pointer rests a few pixels off a link, and raising the precision makes the link light up.",
  section: "Interaction",
  tags: ['linkHoverPrecision', 'onLinkHover', 'linkColor'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
