// Spark example: dyno uniforms set via .value against dynoConst rebuilds
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Uniforms against constants',
  summary:
    'One modifier that squashes and tints a knot, fed either by dynoVec3 / dynoFloat uniforms or by dynoConst values. Uniform sliders just write .value and regenerate, with no recompilation; constant sliders must build a new modifier and call updateGenerator() every time. The readout counts uniform writes against pipeline rebuilds.',
  section: 'Dyno Overview',
  tags: ['dynoFloat', 'dynoVec3', 'DynoUniform', 'dynoConst', 'updateGenerator', 'transformPos'],
  docs: ['repo/docs/docs/dyno-stdlib.md', 'repo/docs/docs/dyno-overview.md', 'repo/docs/docs/splat-mesh.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
