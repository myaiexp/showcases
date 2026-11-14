// playcanvas example: Engine vertex chunks in a custom shader
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Engine vertex chunks: transformCoreVS and normalCoreVS',
  summary:
    'A vertex shader that #includes the engine chunks transformCoreVS and normalCoreVS gets vertex_position, vertex_normal and the functions getModelMatrix, getLocalPosition, getNormalMatrix and getLocalNormal (which also cover skinning, morphing and instancing). A wrap-around diffuse with an orbiting light direction shades three spinning models.',
  section: 'Graphics: Shaders',
  tags: ['#include', 'transformCoreVS', 'normalCoreVS', 'getModelMatrix', 'getNormalMatrix', 'vertex_position', 'vertex_normal'],
  docs: ['repo/docs/user-manual/graphics/shaders/index.md', 'repo/docs/user-manual/graphics/shaders/preprocessor.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
