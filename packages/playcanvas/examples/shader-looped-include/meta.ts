// playcanvas example: Looped shader include
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Looped include with a counter define',
  summary:
    'A chunk written with {i} placeholders is repeated by #include "ringPS, RING_COUNT": the preprocessor pastes it once per count with {i} replaced by 0, 1, 2 and so on. RING_COUNT comes from Material.setDefine, so changing it recompiles the shader with that many concentric rings.',
  section: 'Graphics: Shaders',
  tags: ['#include', 'ShaderChunks', 'Material.setDefine', 'looped include', '{i}'],
  docs: ['repo/docs/user-manual/graphics/shaders/preprocessor.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
