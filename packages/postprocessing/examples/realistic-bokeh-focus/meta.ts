// postprocessing example: Realistic bokeh: focus
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Realistic bokeh: focus',
  summary:
    "RealisticBokehEffect focuses on one depth, given as a fraction of the camera's near-to-far range (the JSDoc says world units). Turning on showFocus tints the pixels that sit on the focal plane orange. RealisticBokehEffect is deprecated and its shader calls linearToRelativeLuminance(), which three 0.187 removed, so this runs a subclass that prepends that helper through setFragmentShader().",
  section: 'Depth of Field',
  tags: ['RealisticBokehEffect', 'focus', 'showFocus'],
  docs: ['repo/README.md', 'repo/src/effects/Effect.js', 'repo/src/effects/RealisticBokehEffect.js', 'repo/src/effects/glsl/realistic-bokeh.frag'],
  provenance: 'pure',
  added: '2026-11-15',
});
