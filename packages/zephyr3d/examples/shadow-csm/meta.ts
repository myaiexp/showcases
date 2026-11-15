// zephyr3d example: Cascaded shadow maps
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Cascaded shadow maps',
  summary:
    'An avenue of pillars stretching 600 units from the camera under a directional light. numShadowCascades splits the view into up to 4 shadow maps (near ones sharper) and splitLambda moves the splits from even to logarithmic; with 1 cascade the near shadows blur.',
  section: 'Shadows',
  tags: ['numShadowCascades', 'splitLambda', 'shadow.shadowMapSize', 'DirectionalLight', 'CSM'],
  docs: ['repo/apps/doc/web/en/shadow-aa.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
