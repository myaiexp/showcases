// zephyr3d example: A mesh from hand-filled vertex buffers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A mesh from hand-filled vertex buffers',
  summary:
    'A single triangle built with device.createVertexBuffer (position_f32x3, diffuse_u8normx4), an index buffer and a Primitive. Toggle vertexColor, and set cullMode to see why a one-face mesh disappears from behind.',
  section: 'Basic Framework',
  tags: ['Primitive', 'createVertexBuffer', 'createIndexBuffer', 'UnlitMaterial', 'vertexColor', 'cullMode'],
  docs: ['repo/apps/doc/web/en/mesh-material.md', 'repo/apps/doc/src/tut-9/main.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
