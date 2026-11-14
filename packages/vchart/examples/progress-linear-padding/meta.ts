// vchart example: Linear progress padding
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Linear progress padding",
  summary:
    "progress.topPadding and progress.bottomPadding inset the fill bar from its track on a horizontal progress chart, leaving a visible border of track around the fill. Two sliders change them.",
  section: "Gauge, Progress and Liquid",
  tags: ['linearProgress', 'progress.topPadding', 'progress.bottomPadding', 'bandWidth'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Progress.md',
    'repo/docs/assets/option/en/series/linear-progress.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
