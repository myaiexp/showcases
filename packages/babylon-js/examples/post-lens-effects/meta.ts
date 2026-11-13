// babylon-js example: Lens effects and depth of field
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Lens effects and depth of field',
  summary:
    'A LensRenderingPipeline built from a parameters object (edge_blur, chromatic_aberration, distortion, grain_amount and the dof_ options) over a corridor of spheres. The setter methods change focus distance, aperture, darkening, aberration, edge blur, distortion and grain live, and pentagon bokeh toggles on and off.',
  section: 'Post Processes',
  tags: ['LensRenderingPipeline', 'setFocusDistance', 'setAperture', 'setChromaticAberration', 'bokeh'],
  docs: ['repo/content/features/featuresDeepDive/postProcesses/dofLenseEffects.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
