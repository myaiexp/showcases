// vchart example: Custom mark animation: appear, enter, update and exit
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Custom mark animation: appear, enter, update and exit",
  summary:
    "A custom mark has its own animation switch and its own animationAppear, animationEnter, animationUpdate and animationExit with duration, delay and easing. Rects bound to keyed rows grow in, move, and leave as the rows change.",
  section: "Option: Animation",
  tags: ["customMark","animation","animationAppear","animationEnter","animationUpdate","animationExit","dataKey"],
  docs: [
    'repo/docs/assets/option/en/common/custom-mark-base.md',
    'repo/docs/assets/option/en/animate/state-animate.md',
    'repo/docs/assets/option/en/common/custom-mark.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
