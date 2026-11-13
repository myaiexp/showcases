// animejs example: Spring perceived and physics parameters
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Spring perceived and physics parameters',
  summary: 'Drives a block with spring() using either perceived parameters (bounce, duration) or physics parameters (mass, stiffness, damping, velocity), with the perceived onComplete flagged separately.',
  section: 'Easings',
  tags: ['spring', 'bounce', 'stiffness', 'damping', 'mass', 'velocity', 'onComplete'],
  docs: [
    'pages/animejs-com/documentation/easings/spring.md',
    'pages/animejs-com/documentation/easings.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
