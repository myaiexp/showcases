// l7 example: Earth lighting options
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Earth lighting options',
  summary:
    'globalOptions sets the light on the sphere: ambientRatio (base light), diffuseRatio (sun shading), specularRatio (shine) and earthTime (where the sun sits).',
  section: 'Experiment',
  tags: ['EarthLayer', 'style', 'globalOptions', 'ambientRatio', 'diffuseRatio', 'specularRatio', 'earthTime'],
  docs: [
    'repo/site/docs/api/experiment/earth.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
