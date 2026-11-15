// zephyr3d example: Three cameras, three viewports
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Three cameras, three viewports',
  summary:
    'An editor-style layout: three cameras share one scene, each with its own viewport. A PerspectiveCamera fills the right half; OrthoCamera top and side views fill the left quadrants. Each camera.render(scene) is its own pass, drawn in order.',
  section: 'Multi-view Rendering',
  tags: ['Camera.viewport', 'OrthoCamera', 'camera.render', 'multi-camera'],
  docs: ['repo/apps/doc/web/en/multi-views.md', 'repo/apps/doc/web/en/scene-basic.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
