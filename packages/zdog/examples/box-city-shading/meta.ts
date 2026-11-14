// Zdog example: City block shading, Box face colours that fake a light
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'City block shading',
  summary:
    'Nine buildings on a plot, each a Box. Zdog has no lights, so the shading is painted: the leftFace, rightFace and topFace colours of each Box are a light, a dark and a bright tone. Switch where the light comes from and every building is recoloured.',
  section: 'Shapes',
  tags: ['Box', 'leftFace', 'rightFace', 'topFace', 'frontFace', 'Rect'],
  docs: ['repo/modules/docs/shapes-composite.hbs'],
  provenance: 'pure',
  added: '2026-11-14',
});
