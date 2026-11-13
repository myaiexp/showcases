// gsap example: timeline duration() as a setter changing timeScale while duration() stays put
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Timeline duration() as a setter',
  summary:
    'Three staggered dots loop on a timeline. A slider calls tl.duration(n) and the panel shows duration() staying fixed while timeScale() changes to fit the loop into n seconds.',
  section: 'Timelines',
  tags: ['duration', 'timeScale', 'totalDuration', 'timeline'],
  docs: [
    'pages/gsap-com/docs/v3/GSAP/Timeline/duration-.md',
    'pages/gsap-com/docs/v3/GSAP/Timeline/timeScale-.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
