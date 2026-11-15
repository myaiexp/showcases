// postprocessing example: Realistic bokeh: bias and fringe
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Realistic bokeh: bias and fringe',
  summary:
    "In RealisticBokehEffect, bias weights the outer rings of the blur more heavily than the inner ones, and fringe pulls the red, green and blue samples apart. Together they turn the lamp discs from soft blobs into rings with colour-fringed edges. RealisticBokehEffect is deprecated and its shader calls linearToRelativeLuminance(), which three 0.187 removed, so this runs a subclass that prepends that helper through setFragmentShader().",
  section: 'Depth of Field',
  tags: ['RealisticBokehEffect', 'bias', 'fringe'],
  docs: ['repo/README.md', 'repo/src/effects/Effect.js', 'repo/src/effects/RealisticBokehEffect.js', 'repo/src/effects/glsl/realistic-bokeh.frag'],
  provenance: 'pure',
  added: '2026-11-15',
});
