// aframe example: Running content scripts: wait for hasLoaded or loaded
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Running content scripts: wait for hasLoaded or loaded',
  summary:
    'The docs\' fallback when you do not want a component: if scene.hasLoaded run now, else run when the scene emits loaded. A button runs the same function again.',
  section: 'Core API',
  tags: ['hasLoaded', 'loaded', 'addEventListener', 'content scripts'],
  docs: ['repo/docs/core/scene.md', 'repo/docs/introduction/javascript-events-dom-apis.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
