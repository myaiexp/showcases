// Babylon.js example: the docs' starter scene
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Starter scene',
  summary:
    'The createScene function from the starter-scene page, plus the part the Playground hides: a canvas, an Engine, runRenderLoop and engine.resize(). A FreeCamera aimed at the origin, a dimmed HemisphericLight, a sphere and a ground.',
  section: 'Starter Scene',
  tags: ['Engine', 'Scene', 'FreeCamera', 'HemisphericLight', 'MeshBuilder'],
  docs: [
    'repo/content/features/starterSceneCode.md',
    'repo/content/setup/frameworkPackages/npmSupport.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
