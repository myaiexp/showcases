// postprocessing example: ColorDepthEffect bit depth stepping down to a retro palette
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Color depth: bits',
  summary:
    'ColorDepthEffect quantises every channel to a virtual bit depth, so the smooth hue strips and grey ramp on the wall break into bands. The bits option (bitDepth at runtime) is the total, and each channel gets a third of it.',
  section: 'Color Depth',
  tags: ['ColorDepthEffect', 'bits', 'bitDepth'],
  docs: ['repo/README.md', 'repo/src/effects/ColorDepthEffect.js', 'repo/src/effects/glsl/color-depth.frag'],
  provenance: 'pure',
  added: '2026-11-15',
});
