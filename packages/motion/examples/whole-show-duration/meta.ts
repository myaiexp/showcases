// motion example: Slideshow stretched to one total duration
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Slideshow stretched to one total duration",
  summary: "A three-slide show loops with a progress bar. Setting one `duration` on the whole sequence squeezes or stretches every slide, hold and fade to fit, so you can retime the show with a single number.",
  section: 'Timeline sequences',
  tags: ['sequence', 'duration', 'repeat', 'onUpdate', 'progress'],
  docs: ['pages/motion-dev/docs/timeline-sequences.md', 'pages/motion-dev/docs/animate.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
