// gsap example: immediateRender on stacked from() tweens
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "immediateRender on stacked from() tweens",
  summary:
    "Two stacked from() tweens on the same property of one box, with the default immediateRender and with immediateRender: false. The two lanes play differently.",
  section: "Resources",
  tags: ["immediateRender", "from", "gotcha"],
  docs: [
    "pages/gsap-com/resources/immediaterender.md",
    "pages/gsap-com/resources/mistakes.md",
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
