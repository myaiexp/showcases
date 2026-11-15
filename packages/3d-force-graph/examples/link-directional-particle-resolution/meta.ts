// 3d-force-graph example: Link styling: particle resolution
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Link styling: particle resolution',
  summary:
    'linkDirectionalParticleResolution is how many segments divide each particle sphere; the default is 4, which is closer to a lumpy gem. Big particles and a close camera show the difference as the slider goes up.',
  section: 'Link styling',
  tags: ['linkDirectionalParticleResolution', 'linkDirectionalParticleWidth'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
