// playcanvas example: Image to splats
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Image to splats with GsplatImage',
  summary:
    'GsplatImage turns a texture asset into one splat per non-transparent pixel on the XZ plane, sized to a 1x1 area. Canvas-drawn textures with transparent corners are wrapped as texture assets and assigned to imageAsset; assigning another asset rebuilds the splats on its own.',
  section: 'Gaussian Splatting',
  tags: ['GsplatImage', 'imageAsset', 'Asset', 'Texture', 'GSplatContainer', 'entity transform'],
  docs: [
    'repo/docs/user-manual/gaussian-splatting/building/procedural-splats/image.md',
    'repo/docs/user-manual/gaussian-splatting/building/procedural-splats/index.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
