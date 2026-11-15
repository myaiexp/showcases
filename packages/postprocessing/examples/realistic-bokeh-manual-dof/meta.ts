// postprocessing example: Realistic bokeh: manual depth of field
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Realistic bokeh: manual depth of field',
  summary:
    "With manualDoF on, RealisticBokehEffect skips the focal length and f-stop maths and reads the dof Vector4: how far in front of and behind the focus the blur starts, and how fast it grows. It gives direct control of a sharp zone. RealisticBokehEffect is deprecated and its shader calls linearToRelativeLuminance(), which three 0.187 removed, so this runs a subclass that prepends that helper through setFragmentShader().",
  section: 'Depth of Field',
  tags: ['RealisticBokehEffect', 'manualDoF', 'dof'],
  docs: ['repo/README.md', 'repo/src/effects/Effect.js', 'repo/src/effects/RealisticBokehEffect.js', 'repo/src/effects/glsl/realistic-bokeh.frag'],
  provenance: 'pure',
  added: '2026-11-15',
});
