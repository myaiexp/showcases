// playcanvas example: Shadow draw calls
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Shadow draw calls',
  summary:
    "Real-time shadows cost extra rendering: the scene is drawn again into each shadow map. A directional or spot light adds one pass, but an omni light renders into a cube map and needs six, so its draw calls show up in app.stats. Twenty-five boxes lit by one light; switch the light type and castShadows and watch the draw call total move. The card cycles an omni light with shadows, without them, and a directional light.",
  section: 'Debugging and Optimization',
  tags: ['castShadows', 'LightComponent', 'omni', 'drawCallCount', 'AppStats'],
  docs: ['repo/docs/user-manual/optimization/guidelines.md', 'repo/docs/user-manual/xr/optimizing-webxr.md', 'repo/docs/user-manual/optimization/app-stats.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
