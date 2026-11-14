// vchart example: Per-mark appear: bars, then points, then the line
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Per-mark appear: bars, then points, then the line",
  summary:
    "A bar and line combination gives each mark its own animationAppear: the bars play one by one within totalTime, the points pop in after them and the line is drawn last. A select swaps all three to fadeIn or scaleIn.",
  section: 'Animation',
  tags: ['animationAppear', 'bar', 'point', 'line', 'delay', 'totalTime', 'oneByOne'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Animation/Configuration_and_Choreography_of_Complex_Animations.md',
    'repo/docs/assets/option/en/animate/mark-animate.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
