// Stripes without a size share the space left over
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Stripe: a width is a size, not an offset",
  summary: "The size is the stripe width, not a position. In @stripe(gold 60%, orange 30%, crimson) crimson gets the last 10%; without any sizes the three stripes are equal thirds; and a mixture shares what is left.",
  section: "Values",
  tags: ["@stripe","linear-gradient"],
  docs: ["pages/css-doodle-com/reference/function-stripe.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
