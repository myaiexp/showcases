// Zdog example: icon set restyled by merging preset objects with Zdog.extend
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Style presets with extend',
  summary:
    'An icon set whose look comes from two presets: a style (outline, solid, chunky) and a colour theme. Zdog.extend copies one options object onto another, so each icon keeps only its own size and the shared look is merged in. Change a preset and every icon follows.',
  section: 'API: Utilities',
  tags: ['extend', 'stroke', 'fill', 'backface', 'removeChild'],
  docs: ['repo/modules/docs/api-utils.hbs', 'repo/modules/docs/api-shape.hbs', 'repo/modules/docs/shapes-basic.hbs', 'repo/modules/docs/api-anchor.hbs'],
  provenance: 'pure',
  added: '2026-11-14',
});
