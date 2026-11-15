// zephyr3d example: Ambient light: hemisphere, ibl or none
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Ambient light: hemisphere, ibl or none',
  summary:
    'The one ambient source of a scene, scene.env.light.type: a hemisphere light blends ambientUp (sky) and ambientDown (ground) by surface normal, ibl lights from the sky, and none leaves only direct lights. Colour pickers set the two hemisphere colours.',
  section: 'Lighting',
  tags: ['env.light.type', 'hemisphere', 'ambientUp', 'ambientDown', 'ibl', 'none'],
  docs: ['repo/apps/doc/web/en/lighting-indirect.md', 'repo/apps/doc/web/en/lighting-intro.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
