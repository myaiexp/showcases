// gsap example: containerAnimation in a horizontal strip
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'ContainerAnimation in a horizontal strip',
  summary:
    'A pinned strip slides sideways as a box scrolls vertically, and each panel gets its own ScrollTrigger that watches the slide through containerAnimation. Switch the slide to a non-linear ease and the panel triggers stop lining up, as the docs warn.',
  section: 'ScrollTrigger',
  tags: ['ScrollTrigger', 'containerAnimation', 'horizontal scroll', 'pin', 'scrub', 'toggleClass'],
  docs: [
    'pages/gsap-com/docs/v3/Plugins/ScrollTrigger.md',
    'pages/gsap-com/docs/v3/Plugins/ScrollToPlugin.md',
    'pages/gsap-com/docs/v3/GSAP/gsap-context-.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
