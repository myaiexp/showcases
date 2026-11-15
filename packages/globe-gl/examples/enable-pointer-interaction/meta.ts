// globe-gl example: Render: enablePointerInteraction
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Render: enablePointerInteraction",
  summary:
    "enablePointerInteraction(false) stops globe.gl from tracking the mouse: no hover raycasts, no tooltips, no click callbacks, which saves work when the globe is just for looking at. The card parks a fake pointer over Lagos while the setting flips.",
  section: "Render Control",
  tags: ["enablePointerInteraction", "pointLabel"],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
