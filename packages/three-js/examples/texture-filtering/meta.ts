// Three.js example: magFilter and minFilter on a generated texture
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Magnification and mipmap filters',
  summary:
    'A 16x16 texture generated in code lies on a plane that recedes into the distance. Switch magFilter (close up) and minFilter (far away) between Nearest, Linear and the four mipmap variants.',
  section: 'Fundamentals',
  tags: ['DataTexture', 'magFilter', 'minFilter', 'mipmaps', 'Texture'],
  docs: [
    'repo/manual/pages/textures.html',
    'repo/docs/pages/DataTexture.html.md',
    'repo/docs/pages/Texture.html.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
