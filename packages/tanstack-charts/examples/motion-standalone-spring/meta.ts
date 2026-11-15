// tanstack-charts example: The standalone spring sampler
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'The standalone spring sampler',
  summary:
    'createChartSpring returns an analytic damped oscillator you can sample at any elapsed time. These curves are real samples from 0 to 100 at 30 ms steps for four parameter sets. A stiff spring rises fast, a lightly damped one rings, and a heavy one is slow. The readout lists when each one comes to rest.',
  section: 'Motion',
  tags: ['createChartSpring', 'spring.sample', 'ChartSpringOptions'],
  docs: ['repo/docs/reference/motion.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
