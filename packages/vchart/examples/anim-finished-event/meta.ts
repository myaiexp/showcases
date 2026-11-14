// vchart example: Animation events: animationFinished
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Animation events: animationFinished",
  summary:
    "The animationFinished event fires when a chart's animations end. A bar chart is updated every few seconds and a readout logs each event with how long after the update it arrived, so the duration setting can be seen in the numbers.",
  section: 'Animation',
  tags: ['animationFinished', 'renderFinished', 'on', 'updateData'],
  docs: [
    'repo/docs/assets/api/en/API/event.md',
    'repo/docs/assets/guide/en/tutorial_docs/Animation/Animation_Types.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
