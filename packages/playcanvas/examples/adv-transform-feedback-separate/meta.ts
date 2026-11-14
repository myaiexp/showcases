// playcanvas example: Separate transform feedback buffers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Separate transform feedback buffers',
  summary:
    'TRANSFORM_FEEDBACK_SEPARATE writes each captured varying to its own buffer. A swarm of 1500 agents keeps position and velocity as swapped input/output pairs, per-agent constants as input only, and a write-only instance stream that an instanced cone draw reads through an overridden transformInstancingVS chunk. WebGL 2 only.',
  section: 'Graphics: Advanced Rendering',
  tags: ['TransformFeedback', 'TRANSFORM_FEEDBACK_SEPARATE', 'createShader', 'setInstancing', 'transformInstancingVS', 'BUFFER_GPUDYNAMIC', 'SEMANTIC_ATTR12'],
  docs: ['repo/docs/user-manual/graphics/advanced-rendering/transform-feedback.md', 'repo/docs/user-manual/graphics/advanced-rendering/hardware-instancing.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
