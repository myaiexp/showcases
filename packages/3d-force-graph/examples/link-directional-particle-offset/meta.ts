// 3d-force-graph example: Link styling: particle offset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Link styling: particle offset',
  summary:
    'linkDirectionalParticleOffset shifts where the particles start, as a fraction of one cycle. Giving each link a different offset staggers them, so they do not all move in lockstep; with the slider at 0 every link looks the same.',
  section: 'Link styling',
  tags: ['linkDirectionalParticleOffset', 'linkDirectionalParticles'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
