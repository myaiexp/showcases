// vchart example: Events: the chart lifecycle
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Events: the chart lifecycle",
  summary:
    "initialized, rendered, layoutStart, layoutEnd, renderFinished, animationFinished and afterResize logged with timestamps. The listeners are attached before renderSync; buttons call updateData and vchart.resize.",
  section: "Events",
  tags: ['on','initialized','rendered','renderFinished','animationFinished','layoutEnd','afterResize'],
  docs: [
    "repo/docs/assets/api/en/API/event.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
