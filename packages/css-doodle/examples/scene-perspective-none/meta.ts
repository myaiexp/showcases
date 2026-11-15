// perspective: none for a parallel view
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "perspective: none for a parallel view",
  summary: "perspective: d sets the camera distance, 2 by default, and none gives a parallel view with no vanishing point. A 5 × 5 field of small boxes is shown with perspective, and then none.",
  section: "Scenes",
  tags: ["@scene", "perspective", "box*5x5", "view"],
  docs: ['pages/css-doodle-com/reference/function-scene.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
