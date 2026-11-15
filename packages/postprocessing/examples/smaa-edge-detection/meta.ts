// postprocessing example: SMAA edge detection modes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'SMAA edge detection modes',
  summary:
    'The edges texture an SMAAEffect finds in the wire scene, in each EdgeDetectionMode. DEPTH only sees silhouettes, LUMA and COLOR also see edges between colours; switch to the result to see what each mode antialiases.',
  section: 'Antialiasing',
  tags: ['SMAAEffect', 'EdgeDetectionMode', 'edgeDetectionMaterial', 'edgesTexture', 'TextureEffect'],
  docs: ['repo/README.md', 'repo/src/effects/SMAAEffect.js', 'repo/src/enums/EdgeDetectionMode.js', 'repo/src/materials/EdgeDetectionMaterial.js', 'repo/src/effects/TextureEffect.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
