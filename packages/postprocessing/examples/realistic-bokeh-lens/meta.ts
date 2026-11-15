// postprocessing example: Realistic bokeh: focal length and f-stop
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Realistic bokeh: focal length and f-stop',
  summary:
    "RealisticBokehEffect works out its blur from lens numbers. A longer focalLength or a smaller fStop narrows the sharp slice around the focus; a short lens at a high f-number keeps most of the corridor crisp. RealisticBokehEffect is deprecated and its shader calls linearToRelativeLuminance(), which three 0.187 removed, so this runs a subclass that prepends that helper through setFragmentShader().",
  section: 'Depth of Field',
  tags: ['RealisticBokehEffect', 'focalLength', 'fStop'],
  docs: ['repo/README.md', 'repo/src/effects/Effect.js', 'repo/src/effects/RealisticBokehEffect.js', 'repo/src/effects/glsl/realistic-bokeh.frag'],
  provenance: 'pure',
  added: '2026-11-15',
});
