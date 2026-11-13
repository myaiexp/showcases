// gsap example: Avoiding a flash of unstyled content
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Avoiding a flash of unstyled content",
  summary:
    "Two panels simulate a slow-loading script. The left sets its start state in JavaScript and flashes visible first; the right is hidden in CSS and revealed with autoAlpha.",
  section: "Resources",
  tags: ["FOUC", "autoAlpha", "visibility"],
  docs: [
    "pages/gsap-com/resources/fouc.md",
    "pages/gsap-com/docs/v3/GSAP/CorePlugins/CSS.md",
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
