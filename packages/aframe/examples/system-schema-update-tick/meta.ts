// aframe example: System schema, update, tick, pause and play
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'System schema, update, tick, pause and play',
  summary:
    'A spinner system takes its speed from the scene\'s own attribute, reruns update(oldData) when scene.setAttribute changes it, turns a box in tick, and reports pause and play when the scene pauses and resumes.',
  section: 'Core API',
  tags: ['registerSystem', 'schema', 'update', 'tick', 'pause', 'play', 'scene.setAttribute'],
  docs: ['repo/docs/core/systems.md', 'repo/docs/core/scene.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
