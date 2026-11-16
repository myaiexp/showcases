// aframe example: dependencies: initialisation order across components
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'dependencies: initialisation order across components',
  summary:
    'Component a depends on b and b on c, so an entity with only a gets c initialised first, then b, then a. The board prints the init order as the handlers run.',
  section: 'Core API',
  tags: ['dependencies', 'init', 'registerComponent'],
  docs: ['repo/docs/core/component.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
