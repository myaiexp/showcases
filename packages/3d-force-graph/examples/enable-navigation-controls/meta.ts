// 3d-force-graph example: Interaction: enableNavigationControls
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Interaction: enableNavigationControls",
  summary:
    "enableNavigationControls(false) switches the camera controls off. With orbit controls and autoRotate on, the rotation stops because the controls' update loop no longer runs, and dragging no longer moves the camera.",
  section: "Interaction",
  tags: ['enableNavigationControls', 'controls', 'zoomToFit'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
