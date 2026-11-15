// galacean example: Transform: position, rotation, scale
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Transform: position, rotation, scale",
  summary:
    "A cube driven only by its transform: setPosition, setRotation and setScale move, turn and stretch it, with the same values readable back through position, rotation and scale. Full view adds nine sliders.",
  section: "Core",
  tags: ['Transform', 'setPosition', 'setRotation', 'setScale', 'position', 'rotation', 'scale'],
  docs: [
    'repo/docs/en/core/transform.mdx',
    'repo/docs/en/core/entity.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
