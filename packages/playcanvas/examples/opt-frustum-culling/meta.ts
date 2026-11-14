// playcanvas example: Camera frustum culling cost
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Camera frustum culling cost',
  summary:
    "A camera skips mesh instances outside its view when frustumCulling is on, so draw calls follow what is visible instead of what exists. Four hundred boxes spread over a wide field are mostly out of view and cost a few dozen draw calls with culling and all 400 without; packed into view they all draw either way, which is the case the guidelines say to turn it off for. Toggle the camera's frustumCulling and the layout, and read app.stats.drawCallCount.",
  section: 'Debugging and Optimization',
  tags: ['frustumCulling', 'CameraComponent', 'drawCallCount', 'AppStats'],
  docs: ['repo/docs/user-manual/optimization/guidelines.md', 'repo/docs/user-manual/optimization/app-stats.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
