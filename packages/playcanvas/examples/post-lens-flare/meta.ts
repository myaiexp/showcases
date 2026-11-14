// playcanvas example: CameraFrame lens flare
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'CameraFrame lens flare',
  summary:
    'LensFlareEffect draws flares of lights from a shape library of textures (glow, star, disc, drawn in code) and per-flare looks of elements placed along the axis through the screen centre. A flare follows the sun light, another a world position; both fade as pillars cover them or the source leaves the screen. The full view tunes intensity, scale, occlusion, edge fade and the lensflare debug view.',
  section: 'Graphics: Post Effects',
  tags: ['LensFlareEffect', 'LensFlare', 'shapes', 'elements', 'occlusionRadius', 'edgeFade', 'CameraFrame.addEffect', 'lensflare'],
  docs: ['repo/docs/user-manual/graphics/posteffects/cameraframe/lens-flare.md', 'repo/docs/user-manual/graphics/posteffects/cameraframe/index.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
