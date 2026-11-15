// postprocessing example: SMAA predication mode
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'SMAA predication',
  summary:
    'The colour edges texture of an SMAAEffect with PredicationMode.DEPTH on and off. With predication, depth edges lower the colour threshold locally, so silhouettes keep their edges; threshold, scale and strength tune it. PredicationMode.CUSTOM is left out, since it needs a predication buffer of your own.',
  section: 'Antialiasing',
  tags: ['SMAAEffect', 'PredicationMode', 'predicationThreshold', 'predicationScale', 'predicationStrength', 'edgesTexture'],
  docs: ['repo/README.md', 'repo/src/effects/SMAAEffect.js', 'repo/src/enums/PredicationMode.js', 'repo/src/materials/EdgeDetectionMaterial.js', 'repo/src/effects/TextureEffect.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
