// zephyr3d example: MSDFTextSprite: billboard nameplates
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'MSDFTextSprite: billboard nameplates',
  summary:
    'MSDFTextSprite shares MSDFText\'s font pipeline but always faces the camera, so it suits floating labels and nameplates; an MSDFText beside them turns edge-on as you orbit. The Z rotation of a sprite spins it in its plane.',
  section: 'Basic Framework',
  tags: ['MSDFTextSprite', 'MSDFText', 'FontAsset', 'fetchFontAsset', 'rotation'],
  docs: ['repo/apps/doc/web/en/text-rendering.md', 'repo/apps/doc/src/tut-54/main.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
