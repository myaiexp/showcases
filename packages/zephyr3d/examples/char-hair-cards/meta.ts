// zephyr3d example: Hair cards: HairMaterial with Kajiya-Kay and Marschner shading
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Hair cards: HairMaterial with Kajiya-Kay and Marschner shading',
  summary:
    'Ribbon cards generated in code form a bob around a head, drawn with HairMaterial on an ordinary Mesh. Switch shadingModel between kajiya-kay and marschner and tune each model\'s own parameters, the strand direction and the shift texture while a light circles the head.',
  section: 'Character Rendering',
  tags: ['HairMaterial', 'shadingModel', 'kajiya-kay', 'marschner', 'strandDirection', 'specular1Power', 'specular2Color', 'shiftMapScale', 'specularShiftTexture'],
  docs: ['repo/apps/doc/web/en/material-hair.md', 'repo/apps/doc/web/en/asset-loading.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
