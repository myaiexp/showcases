// 3d-force-graph example: Interaction: onBackgroundClick and onBackgroundRightClick
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Interaction: onBackgroundClick and onBackgroundRightClick",
  summary:
    "onBackgroundClick fires for clicks on empty space and clears the selected node; onBackgroundRightClick fires for right-clicks there and here calls zoomToFit to bring the camera back.",
  section: "Interaction",
  tags: ['onBackgroundClick', 'onBackgroundRightClick', 'onNodeClick', 'zoomToFit'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
