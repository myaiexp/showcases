// Three.js example: extruded, bevelled 3D text with TextGeometry
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: '3D text',
  summary:
    'TextGeometry extrudes a string from a font parsed by FontLoader. The full view exposes depth and the bevel options (thickness, size, segments). The font is built in code, so nothing is fetched.',
  section: 'Getting Started',
  tags: ['TextGeometry', 'FontLoader', 'Font', 'ExtrudeGeometry', 'bevel'],
  docs: [
    'repo/manual/pages/creating-text.html',
    'repo/docs/pages/TextGeometry.html.md',
    'repo/docs/pages/FontLoader.html.md',
    'repo/docs/pages/Font.html.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
