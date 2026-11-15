// force-graph example: Link styling: particle speed per link
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Link styling: particle speed per link',
  summary:
    'linkDirectionalParticleSpeed is the share of the link length a particle covers per frame. It takes an accessor, so each link can run at its own pace: here the speed is the link\'s value times a multiplier, and the multiplier is read every frame.',
  section: 'Link styling',
  tags: ['linkDirectionalParticleSpeed', 'linkDirectionalParticles', 'linkDirectionalParticleWidth', 'linkColor'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
