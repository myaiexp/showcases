// aframe example: Running content scripts: a component on the scene
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Running content scripts: a component on the scene',
  summary:
    'The recommended way to script a scene: register a do-something component and attach it to <a-scene>. Its init runs after the scene\'s children are initialised, so it can already find the box and turn it red.',
  section: 'Core API',
  tags: ['registerComponent', 'a-scene', 'init', 'querySelector', 'content scripts'],
  docs: ['repo/docs/core/scene.md', 'repo/docs/introduction/javascript-events-dom-apis.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
