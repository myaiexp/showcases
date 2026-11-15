// postprocessing example: SMAAPreset quality levels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'SMAA presets',
  summary:
    'Hairline wires, thin slats and a fine grid, smoothed by an SMAAEffect. Pick a SMAAPreset from LOW to ULTRA, or watch a card cycle them; the readout shows what each preset sets: edge threshold, search steps, diagonal and corner detection.',
  section: 'Antialiasing',
  tags: ['SMAAEffect', 'SMAAPreset', 'applyPreset', 'edgeDetectionMaterial', 'weightsMaterial'],
  docs: ['repo/src/effects/SMAAEffect.js', 'repo/src/enums/SMAAPreset.js', 'repo/src/materials/EdgeDetectionMaterial.js', 'repo/src/materials/SMAAWeightsMaterial.js', 'repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
