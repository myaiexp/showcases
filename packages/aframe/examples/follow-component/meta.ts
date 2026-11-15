// aframe example: A follow component: one entity chases another in tick()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A follow component: one entity chases another in tick()',
  summary:
    'The docs\' follow component: a selector property names the target, a number property sets the speed in m/s, and tick() moves the entity toward the target using timeDelta, stopping within a metre. A helper Vector3 made once in init() is reused every frame.',
  section: 'Introduction',
  tags: ['registerComponent', 'tick', 'timeDelta', 'selector', 'object3D.position', 'setAttribute'],
  docs: ['repo/docs/introduction/writing-a-component.md', 'repo/docs/components/animation.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
