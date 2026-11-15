// 3d-force-graph example: Render control: camera
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Render control: camera",
  summary:
    "camera() is the three PerspectiveCamera: set its fov and call updateProjectionMatrix() to change the lens. With the dolly option the camera also slides along its line of sight to keep the graph the same size.",
  section: "Render control",
  tags: ['camera', 'cameraPosition'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
