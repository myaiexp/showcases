// postprocessing example: ScanlineEffect with a changing density
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Scanlines: density',
  summary:
    'ScanlineEffect overlays horizontal lines (OVERLAY blend by default). density is the number of lines relative to the screen height, so 1.25 is a line every 0.8 pixels and smaller values give wide stripes.',
  section: 'Pattern',
  tags: ['ScanlineEffect', 'density', 'BlendFunction'],
  docs: ['repo/README.md', 'repo/src/effects/ScanlineEffect.js', 'repo/src/effects/glsl/scanlines.frag'],
  provenance: 'pure',
  added: '2026-11-15',
});
