// Three.js example: scene.background and scene.environment from a RoomEnvironment
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Background and environment map',
  summary:
    'A RoomEnvironment is baked by PMREMGenerator and assigned to scene.environment for reflections and to scene.background. Sliders drive backgroundBlurriness, backgroundIntensity and environmentIntensity on mirror, glossy and gold objects.',
  section: 'Solutions',
  tags: ['scene.background', 'scene.environment', 'PMREMGenerator', 'RoomEnvironment', 'backgroundBlurriness'],
  docs: [
    'repo/manual/pages/backgrounds.html',
    'repo/docs/pages/RoomEnvironment.html.md',
    'repo/docs/pages/PMREMGenerator.html.md',
    'repo/docs/pages/Scene.html.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
