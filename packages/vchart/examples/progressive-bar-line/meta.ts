// vchart example: Progressive rendering: bar and line
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Progressive rendering: bar and line",
  summary:
    "A bar and line combination with thousands of points draws in slices set by progressiveStep once a series passes progressiveThreshold. Sliders change the point count and both options; a readout shows the renderSync time and the renderFinished events.",
  section: "Progressive Rendering",
  tags: ['progressiveStep','progressiveThreshold','common','renderFinished'],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Progressive_Render.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
