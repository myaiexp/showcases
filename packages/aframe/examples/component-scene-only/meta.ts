// aframe example: sceneOnly: a component that can only live on the scene
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'sceneOnly: a component that can only live on the scene',
  summary:
    'A mood component with sceneOnly: true sets the scene background. It works on <a-scene>; trying to add it to a box throws, and the error message is shown.',
  section: 'Core API',
  tags: ['sceneOnly', 'a-scene', 'background', 'registerComponent'],
  docs: ['repo/docs/core/component.md', 'repo/docs/core/scene.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
