// postprocessing example: Shock wave: depth picking
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Shock wave: depth picking',
  summary:
    "DepthPickingPass reads one depth value from the scene on demand. Click the scene: readDepth(ndc) resolves with the depth under the pointer, the point is unprojected back to world space, and the ShockWaveEffect explodes from exactly there. Cards click scripted spots.",
  section: 'Shock Wave',
  tags: ['DepthPickingPass', 'readDepth', 'ShockWaveEffect', 'position', 'explode'],
  docs: ['repo/README.md', 'repo/src/effects/ShockWaveEffect.js', 'repo/src/passes/DepthPickingPass.js', 'repo/src/passes/DepthCopyPass.js', 'repo/src/enums/DepthCopyMode.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
