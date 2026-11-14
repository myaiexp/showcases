// vchart example: Animation controlOptions: immediatelyApply and stopWhenStateChange
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Animation controlOptions: immediatelyApply and stopWhenStateChange",
  summary:
    "A mark animation with a delay shows the bars before the animation starts unless controlOptions.immediatelyApply puts them at their start state at once. stopWhenStateChange ends a running animation as soon as the bar's state changes; the card hovers a bar mid-animation.",
  section: "Option: Animation",
  tags: ["controlOptions","immediatelyApply","stopWhenStateChange","delay","growHeightIn"],
  docs: [
    'repo/docs/assets/option/en/animate/mark-animate.md',
    'repo/docs/assets/option/en/animate/animation.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
