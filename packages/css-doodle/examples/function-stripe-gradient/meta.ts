// @stripe turns colors into stripes of equal width
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Stripe: hard-edged colors",
  summary: "@stripe(#000, #e6437d, #ebbf4d) works out the start and end of each stripe, so a linear-gradient with a random angle becomes three equal bands per tile.",
  section: "Values",
  tags: ["@stripe","@r","linear-gradient"],
  docs: ["pages/css-doodle-com/reference/function-stripe.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
