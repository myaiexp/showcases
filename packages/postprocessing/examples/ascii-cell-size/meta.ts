// postprocessing example: ASCIIEffect cellSize from fine print to big glyphs
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'ASCII: cell size',
  summary:
    'ASCIIEffect replaces each cell of pixels with a character picked by the cell luminance, drawn in the scene colour. cellSize sets the cell in pixels (even numbers are recommended); the default ASCIITexture supplies the characters.',
  section: 'Pattern',
  tags: ['ASCIIEffect', 'ASCIITexture', 'cellSize'],
  docs: ['repo/README.md', 'repo/src/effects/ASCIIEffect.js', 'repo/src/textures/ASCIITexture.js', 'repo/src/effects/glsl/ascii.frag'],
  provenance: 'pure',
  added: '2026-11-15',
});
