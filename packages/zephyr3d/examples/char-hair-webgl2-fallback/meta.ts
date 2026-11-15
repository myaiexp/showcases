// zephyr3d example: Hair strands on WebGL2: what is drawn and what is not
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Hair strands on WebGL2: what is drawn and what is not',
  summary:
    'HairStrandData and HairStrandMaterial are built as the docs describe next to a hair-card version of the same hair. On WebGL2 the strand mesh is not drawn, isHairSimulationSupported() is false and light.shadow.mode = \'dom\' reads back as pcf.',
  section: 'Character Rendering',
  tags: ['HairStrandData', 'HairStrandMaterial', 'isHairSimulationSupported', 'shadow.mode', 'dom', 'minPixelWidth', 'strandRoundness'],
  docs: ['repo/apps/doc/web/en/material-hair.md', 'repo/apps/doc/web/en/backend-support.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
