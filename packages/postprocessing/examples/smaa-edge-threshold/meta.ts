// postprocessing example: SMAA edge detection threshold
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'SMAA edge threshold',
  summary:
    'The edges texture of an SMAAEffect using luma detection. The edgeDetectionThreshold slider sets how much contrast counts as an edge (lower finds more), and localContrastAdaptationFactor drops edges that sit beside much stronger ones.',
  section: 'Antialiasing',
  tags: ['SMAAEffect', 'edgeDetectionThreshold', 'localContrastAdaptationFactor', 'EdgeDetectionMaterial', 'edgesTexture'],
  docs: ['repo/README.md', 'repo/src/effects/SMAAEffect.js', 'repo/src/materials/EdgeDetectionMaterial.js', 'repo/src/enums/EdgeDetectionMode.js', 'repo/src/effects/TextureEffect.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
