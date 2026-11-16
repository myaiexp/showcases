// aframe example: Accessing a component's members and methods through entity.components
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Accessing a component\'s members and methods through entity.components',
  summary:
    'A foo component stores bar in init and exposes qux(). Other code reads entity.components.foo.bar and calls .qux() to grow the sphere, with each result printed on the board.',
  section: 'Core API',
  tags: ['components', 'component methods', 'registerComponent'],
  docs: ['repo/docs/core/component.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
