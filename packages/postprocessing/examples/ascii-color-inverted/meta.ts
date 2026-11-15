// postprocessing example: ASCIIEffect colour override and the inverted option
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'ASCII: colour and inverted',
  summary:
    'ASCIIEffect normally tints every character with the scene colour. color replaces that with one flat colour (null restores it) and inverted flips which cells get the dense characters, so a dark scene draws light glyphs.',
  section: 'Pattern',
  tags: ['ASCIIEffect', 'color', 'inverted', 'cellSize'],
  docs: ['repo/README.md', 'repo/src/effects/ASCIIEffect.js', 'repo/src/effects/glsl/ascii.frag'],
  provenance: 'pure',
  added: '2026-11-15',
});
