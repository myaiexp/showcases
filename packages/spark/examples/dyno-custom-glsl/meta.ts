// Spark example: a custom Dyno with GLSL globals and statements inside a modifier
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A custom Dyno written in GLSL',
  summary:
    'A subclass of dyno.Dyno whose globals declare a value-noise function (via unindent) and whose statements, from unindentLines, push each splat around by that noise and tint it. It sits in an objectModifiers dynoBlock like any built-in block, with frequency, displacement and time arriving as uniform inputs.',
  section: 'Dyno Overview',
  tags: ['dyno.Dyno', 'globals', 'statements', 'unindent', 'unindentLines', 'GLSL', 'objectModifiers'],
  docs: ['repo/docs/docs/dyno-overview.md', 'repo/docs/docs/splat-mesh.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
