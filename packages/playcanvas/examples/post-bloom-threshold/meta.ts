// playcanvas example: CameraFrame bloom threshold
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'CameraFrame bloom threshold and quality',
  summary:
    'Bloom glows the whole scene at threshold 0; raising bloom.threshold restricts the glow to what is brighter than it, so only the neon bars keep their halo while lit surfaces stop glowing. The card sweeps the threshold; the full view sets intensity, blur levels and the full-resolution highQuality bloom.',
  section: 'Graphics: Post Effects',
  tags: ['CameraFrame', 'bloom.intensity', 'bloom.threshold', 'bloom.blurLevel', 'bloom.highQuality'],
  docs: ['repo/docs/user-manual/graphics/posteffects/cameraframe/index.md', 'repo/docs/user-manual/graphics/posteffects/index.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
