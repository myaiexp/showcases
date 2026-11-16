// aframe example: Entity pause() and play(): animations, components and children
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Entity pause() and play(): animations, components and children',
  summary:
    'pause() stops an entity\'s animation and calls the pause handler of each component, then of its child entities; play() resumes them. Each handler reports itself on the board.',
  section: 'Core API',
  tags: ['pause', 'play', 'animation', 'component pause', 'component play'],
  docs: ['repo/docs/core/entity.md', 'repo/docs/core/component.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
