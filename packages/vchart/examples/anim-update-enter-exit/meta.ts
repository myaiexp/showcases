// vchart example: Data update: enter, update and exit
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Data update: enter, update and exit",
  summary:
    "Every two seconds updateData swaps in a new set of categories. Bars that appear use animationEnter, bars that stay use animationUpdate and bars that leave use animationExit; sliders set each duration.",
  section: 'Animation',
  tags: ['updateData', 'animationEnter', 'animationUpdate', 'animationExit'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Animation/Animation_Types.md',
    'repo/docs/assets/option/en/animate/animation.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
