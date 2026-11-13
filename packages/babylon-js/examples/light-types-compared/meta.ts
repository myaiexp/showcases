// babylon-js example: the light types compared
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'The light types compared',
  summary:
    'A point, a directional, a spot and a hemispheric light each light their own tile, sphere and cube through includedOnlyMeshes, with the light moving or sweeping so the differences show. The hemispheric light uses groundColor, and buttons call setEnabled on each light.',
  section: 'Lights',
  tags: ['PointLight', 'DirectionalLight', 'SpotLight', 'HemisphericLight', 'includedOnlyMeshes', 'groundColor', 'setEnabled'],
  docs: ['repo/content/features/featuresDeepDive/lights/lights_introduction.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
