// playcanvas example: A first splat app
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A first splat app with the engine',
  summary:
    'The shape of the engine guide\'s first splat app: a graphics device with antialias off for fill-rate-bound splat rendering, a camera entity with the engine\'s CameraControls script, and an entity with a gsplat component, here fed a procedural container instead of a downloaded file. The panel applies the guide\'s 180 degree Z rotation.',
  section: 'Gaussian Splatting',
  tags: ['Application', 'CameraControls', 'gsplat component', 'GSplatContainer', 'antialias', 'Entity.setEulerAngles'],
  docs: [
    'repo/docs/user-manual/gaussian-splatting/building/your-first-app/engine.md',
    'repo/docs/user-manual/gaussian-splatting/building/performance.md',
    'repo/docs/user-manual/gaussian-splatting/viewing.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
