// vchart example: Axis label style as a callback
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Axis label style as a callback",
  summary: "The band axis label style is a function of the label value and index, so one label at a time is bold and coloured. A slider (or the card's timer) moves the highlighted day.",
  section: "Option: Components",
  tags: ["axes.label.style","style callback","band axis"],
  docs: [
    'repo/docs/assets/option/en/component/axis-common/axis-label.md',
    'repo/docs/assets/option/en/component/axis-common/style-callback.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
