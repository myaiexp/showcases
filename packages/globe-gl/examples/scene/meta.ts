// globe-gl example: Render: scene
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Render: scene",
  summary:
    "scene() returns the internal Three.js scene, so any object can sit beside the globe: a grey moon three globe radii out circles it along a thin orbit ring. Sizes come from getGlobeRadius().",
  section: "Render Control",
  tags: ["scene", "getGlobeRadius"],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
