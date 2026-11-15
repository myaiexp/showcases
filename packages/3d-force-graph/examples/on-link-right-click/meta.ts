// 3d-force-graph example: Interaction: onLinkRightClick
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Interaction: onLinkRightClick",
  summary:
    "onLinkRightClick removes the link that was right-clicked by setting graphData again without it. The nodes keep their positions and the layout relaxes; a button restores the data.",
  section: "Interaction",
  tags: ['onLinkRightClick', 'graphData', 'linkWidth'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
