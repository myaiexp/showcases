// vchart example: Appear animation: oneByOne
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Appear animation: oneByOne",
  summary:
    "animationAppear.oneByOne staggers the graphics: false starts them together, true plays them one after another and a number adds that many milliseconds between starts. A slider sets the gap.",
  section: 'Animation',
  tags: ['animationAppear', 'oneByOne', 'stagger'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Animation/Animation_Attributes_and_Settings.md',
    'repo/docs/assets/guide/en/tutorial_docs/Animation/Animation_Types.md',
    'repo/docs/assets/option/en/animate/animation.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
