// aframe example: Property type inference from a default, and defaults from a type
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Property type inference from a default, and defaults from a type',
  summary:
    'A schema with only defaults gets types (10 is a number, \'foo\' a string, [1,2,3] an array); one with only types gets defaults (0, empty string, 0 0 0). The board prints the resolved schema of the registered component.',
  section: 'Core API',
  tags: ['schema', 'type inference', 'default', 'vec3'],
  docs: ['repo/docs/core/component.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
