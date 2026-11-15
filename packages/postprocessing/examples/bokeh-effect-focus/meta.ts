// postprocessing example: Bokeh effect: focus and dof
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bokeh effect: focus and dof',
  summary:
    "The older BokehEffect (deprecated in favour of DepthOfFieldEffect) takes focus as a fraction of the camera's depth range and dof as the band around it that stays sharp. Everything beyond that band is smeared by a ring of samples.",
  section: 'Depth of Field',
  tags: ['BokehEffect', 'focus', 'dof', 'uniforms'],
  docs: ['repo/README.md', 'repo/src/effects/BokehEffect.js', 'repo/src/effects/glsl/bokeh.frag'],
  provenance: 'pure',
  added: '2026-11-15',
});
