// zephyr3d example: Shader functions, overloads and structs
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Shader functions, overloads and structs',
  summary:
    'pb.func builds shader functions: one returns a rotated vec2, palette is overloaded for float and vec3, order swaps its inout arguments, and pb.defineStruct makes a Ring struct whose radius member drives the picture.',
  section: 'Device API',
  tags: ['pb.func', 'inout', 'defineStruct', '$return', '$if', 'smoothStep', 'mix', 'overload'],
  docs: ['repo/apps/doc/web/en/shader.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
