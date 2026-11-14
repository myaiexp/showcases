// vchart example: Indicator text that fits its space
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Indicator text that fits its space",
  summary: "Inside a donut the indicator's title and content can shrink or grow to the hole: autoFit with fitPercent, and the inscribed fitStrategy that sizes all the texts together. Sliders resize the ring's hole to show the text following.",
  section: "Option: Components",
  tags: ["indicator.autoFit","fitPercent","fitStrategy","innerRadius"],
  docs: [
    'repo/docs/assets/option/en/component/indicator/indicator-item.md',
    'repo/docs/assets/option/en/component/indicator/indicator.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
