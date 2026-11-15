// globe-gl example: Render: camera
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Render: camera",
  summary:
    "camera() hands back the internal Three.js PerspectiveCamera. Changing its fov and moving it with pointOfView so the globe keeps its screen size shows the lens itself: a wide angle up close makes the columns splay, a narrow one from far away flattens the view.",
  section: "Render Control",
  tags: ["camera", "PerspectiveCamera", "fov", "pointOfView"],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
