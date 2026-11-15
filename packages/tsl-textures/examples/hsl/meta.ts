// tsl-textures example: hsl
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'hsl',
  summary:
    'hsl(vec3(h, s, l)) converts hue, saturation and lightness to rgb. The angle around the model is the hue, so a colour wheel wraps the sphere, with sliders for hue shift, saturation and lightness.',
  section: 'Utilities',
  tags: ['hsl', 'colour', 'hue', 'gradient'],
  docs: ['repo/src/tsl-utils.js', 'repo/src/tsl-textures.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
