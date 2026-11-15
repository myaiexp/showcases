// postprocessing example: ASCIITexture with your own characters, font and size
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'ASCII: custom character set',
  summary:
    'ASCIIEffect draws from an ASCIITexture: a canvas atlas of characters ordered from sparse to dense. The example builds its own with characters, font, fontSize, size and cellCount, and assigns it to the effect, which disposes the one it replaces.',
  section: 'Pattern',
  tags: ['ASCIITexture', 'ASCIIEffect', 'asciiTexture', 'characters', 'font', 'fontSize', 'cellCount'],
  docs: ['repo/README.md', 'repo/src/textures/ASCIITexture.js', 'repo/src/effects/ASCIIEffect.js', 'repo/src/effects/glsl/ascii.frag'],
  provenance: 'pure',
  added: '2026-11-15',
});
