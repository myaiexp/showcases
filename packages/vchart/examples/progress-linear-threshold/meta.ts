// vchart example: Linear progress threshold colours
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Linear progress threshold colours",
  summary:
    "A fill of type threshold maps the value to a colour: red below 0.6, amber up to 0.8, green above. Three bars climb and wrap so each one crosses both thresholds as its value changes.",
  section: "Gauge, Progress and Liquid",
  tags: ['linearProgress', 'progress.style.fill', 'threshold', 'domain', 'range'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Progress.md',
    'repo/docs/assets/option/en/series/linear-progress.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
