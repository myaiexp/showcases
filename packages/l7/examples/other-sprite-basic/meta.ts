// l7 example: SpriteGeometry
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'SpriteGeometry',
  summary:
    'GeometryLayer with shape(\'sprite\') is a particle layer, here snow: spriteCount flakes spread over spriteRadius around center, falling spriteTop high with a spriteUpdate step per frame.',
  section: 'Other Layers',
  tags: ['GeometryLayer', 'shape(\'sprite\')', 'spriteCount', 'spriteRadius', 'spriteTop', 'spriteUpdate', 'spriteScale', 'mapTexture'],
  docs: [
    'repo/site/docs/api/other/sprite.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
