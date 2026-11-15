// tsl-textures example: toHsl
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'toHsl',
  summary:
    'toHsl() splits the rgb output of any texture into hue, saturation and lightness. Edit those, then hsl() turns it back: a camouflage texture beside a copy with shifted hue and scaled saturation and lightness.',
  section: 'Utilities',
  tags: ['toHsl', 'hsl', 'hue shift', 'camouflage'],
  docs: ['repo/src/tsl-utils.js', 'repo/src/tsl-textures.js', 'repo/src/camouflage.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
