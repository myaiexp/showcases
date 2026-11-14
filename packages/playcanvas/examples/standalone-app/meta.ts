// playcanvas example: Standalone app with AppBase
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Standalone app with AppBase',
  summary:
    'The standalone guide\'s first app, written out in full: createGraphicsDevice asks for WebGPU and falls back to WebGL 2, AppOptions lists only the render, camera and light systems plus the texture and container handlers, and an update listener spins a box. The full view names the device type it got.',
  section: 'Engine',
  tags: ['createGraphicsDevice', 'AppBase', 'AppOptions', 'RESOLUTION_AUTO', 'update event'],
  docs: ['repo/docs/user-manual/engine/standalone.md', 'repo/docs/user-manual/engine/index.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
