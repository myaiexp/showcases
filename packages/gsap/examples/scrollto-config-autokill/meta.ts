// gsap example: ScrollTo config autoKill
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'ScrollTo global autoKill',
  summary:
    'ScrollToPlugin.config({ autoKill: true }) makes every scrollTo tween notice a scroll it did not make and drop that part of itself. Start a four-second scroll in a box, scroll up part-way as a user would, and compare the box with the setting on and off.',
  section: 'ScrollTo',
  tags: ['ScrollToPlugin', 'config', 'autoKill', 'scrollTo', 'scrollTop'],
  docs: [
    'pages/gsap-com/docs/v3/Plugins/ScrollToPlugin/config-.md',
    'pages/gsap-com/docs/v3/Plugins/ScrollToPlugin.md',
    'pages/gsap-com/docs/v3/GSAP/gsap-context-.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
