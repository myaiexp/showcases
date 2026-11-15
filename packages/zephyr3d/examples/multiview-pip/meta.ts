// zephyr3d example: Picture-in-picture: one camera, two viewports
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Picture-in-picture: one camera, two viewports',
  summary:
    'Instead of setRenderable, the tick handler renders the scene twice with camera.render: once with a full-canvas viewport, then with a small viewport in the corner. Viewports are [x, y, width, height] in CSS pixels from the bottom-left, and camera.updateController() is called by hand.',
  section: 'Multi-view Rendering',
  tags: ['Camera.viewport', 'camera.render', 'updateController', 'deviceXToScreen', 'aspect'],
  docs: ['repo/apps/doc/web/en/multi-views.md', 'repo/apps/doc/web/en/first-app.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
