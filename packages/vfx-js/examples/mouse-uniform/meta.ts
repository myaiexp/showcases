// VFX-JS example: a spotlight that follows the built-in mouse uniform
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'The mouse uniform',
  summary:
    'VFX-JS passes the pointer position as uniform vec2 mouse, in the same space as gl_FragCoord. This shader greys the picture and lights a circle around the pointer by measuring distance(gl_FragCoord.xy, mouse). The card moves a stand-in pointer.',
  section: 'How it Works',
  tags: ['mouse', 'uniforms', 'gl_FragCoord', 'custom shader'],
  docs: ['pages/amagi-dev/vfx-js/how-it-works.md', 'pages/amagi-dev/vfx-js/shaders.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
