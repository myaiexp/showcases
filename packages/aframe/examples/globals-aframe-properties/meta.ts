// aframe example: The AFRAME global: its properties listed and checked
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'The AFRAME global: its properties listed and checked',
  summary:
    'Lists the properties the globals page documents (prototypes, registries, register functions, THREE, utils, version) with live counts and checks, such as that an a-box is an instance of AFRAME.AEntity.',
  section: 'Core API',
  tags: ['AFRAME', 'AComponent', 'AEntity', 'ANode', 'AScene', 'components', 'geometries', 'primitives', 'shaders', 'systems', 'THREE', 'version'],
  docs: ['repo/docs/core/globals.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
