// postprocessing example: TiltShiftEffect focus band
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tilt shift focus band',
  summary:
    'A TiltShiftEffect keeps a band of the frame sharp and blurs the rest, which makes a full-size scene read as a miniature. offset moves the band, rotation turns it, focusArea sizes it and feather softens its edges.',
  section: 'Blur',
  tags: ['TiltShiftEffect', 'offset', 'rotation', 'focusArea', 'feather'],
  docs: ['repo/README.md', 'repo/src/effects/TiltShiftEffect.js', 'repo/src/passes/TiltShiftBlurPass.js', 'repo/src/materials/TiltShiftBlurMaterial.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
