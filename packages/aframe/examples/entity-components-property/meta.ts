// aframe example: entity.components: reach a component's data, three.js objects and methods
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'entity.components: reach a component\'s data, three.js objects and methods',
  summary:
    'Reads the three.js camera and material that components hold through entity.components, and calls a custom component\'s method (pulse) from outside. The board in the scene prints what each call returned.',
  section: 'Core API',
  tags: ['components', 'components.camera.camera', 'components.material.material', 'querySelector'],
  docs: ['repo/docs/core/entity.md', 'repo/docs/core/component.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
