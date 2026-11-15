// zephyr3d example: Clear the frame every tick
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Clear the frame every tick',
  summary:
    'new Application with the WebGL2 backend, ready(), a tick handler and run(): the frame loop clears the frame buffer with device.clearFrameBuffer and the DEPTH_CLEAR_VALUE constant.',
  section: 'Getting Started',
  tags: ['Application', 'backendWebGL2', 'ready', 'run', 'tick', 'clearFrameBuffer', 'DEPTH_CLEAR_VALUE'],
  docs: ['repo/apps/doc/web/en/first-app.md', 'repo/apps/doc/src/tut-0/main.js', 'repo/apps/doc/web/en/scene-basic.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
