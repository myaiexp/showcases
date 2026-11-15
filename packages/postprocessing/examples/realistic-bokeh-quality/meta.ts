// postprocessing example: Realistic bokeh: rings, samples and pentagon
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Realistic bokeh: rings, samples and pentagon',
  summary:
    "RealisticBokehEffect blurs with rings of samples. More rings and samples give smoother, rounder discs around the bright lamps; the pentagon option turns the discs into five-sided apertures, which needs plenty of both to read. RealisticBokehEffect is deprecated and its shader calls linearToRelativeLuminance(), which three 0.187 removed, so this runs a subclass that prepends that helper through setFragmentShader().",
  section: 'Depth of Field',
  tags: ['RealisticBokehEffect', 'rings', 'samples', 'pentagon'],
  docs: ['repo/README.md', 'repo/src/effects/Effect.js', 'repo/src/effects/RealisticBokehEffect.js', 'repo/src/effects/glsl/realistic-bokeh.frag'],
  provenance: 'pure',
  added: '2026-11-15',
});
