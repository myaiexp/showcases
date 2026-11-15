// 3d-force-graph example: Link styling: particle speed per link
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Link styling: particle speed per link',
  summary:
    'linkDirectionalParticleSpeed is the share of the link a particle travels per frame, so the same number is slower on a long link. The speed here follows each link value; the slider scales all of them and 0 stops the particles.',
  section: 'Link styling',
  tags: ['linkDirectionalParticleSpeed', 'linkDirectionalParticles'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
