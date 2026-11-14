// motion example: Spring curve visualiser with sliders
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Spring curve visualiser with sliders',
  summary: 'Tune a spring and see its shape. spring() returns a generator that can be sampled at any time, so this example samples it every 16 ms into a curve and replays the same samples as a ball sliding along a rail. Compare stiffness, damping and mass with the easier bounce and visual duration.',
  section: 'Utils',
  tags: ['spring', 'generator.next', 'stiffness', 'damping', 'mass', 'bounce', 'visualDuration'],
  docs: ['pages/motion-dev/docs/spring.md', 'pages/motion-dev/docs/animate.md', 'pages/motion-dev/docs/scope-motion.md', 'pages/motion-dev/docs/delay.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
