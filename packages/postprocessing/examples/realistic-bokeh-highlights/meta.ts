// postprocessing example: Realistic bokeh: luminance threshold and gain
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Realistic bokeh: luminance threshold and gain',
  summary:
    "Bright pixels get extra weight when RealisticBokehEffect gathers its blur. luminanceThreshold sets how bright counts as a highlight and luminanceGain how much it is boosted, so the out-of-focus lamps turn into glowing discs. RealisticBokehEffect is deprecated and its shader calls linearToRelativeLuminance(), which three 0.187 removed, so this runs a subclass that prepends that helper through setFragmentShader().",
  section: 'Depth of Field',
  tags: ['RealisticBokehEffect', 'luminanceThreshold', 'luminanceGain', 'HalfFloatType'],
  docs: ['repo/README.md', 'repo/src/effects/Effect.js', 'repo/src/effects/RealisticBokehEffect.js', 'repo/src/effects/glsl/realistic-bokeh.frag'],
  provenance: 'pure',
  added: '2026-11-15',
});
