// vchart example: Theme: callbacks by name in a theme
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Theme: callbacks by name in a theme",
  summary:
    "A theme kept as plain JSON uses the name of a function registered with VChart.registerFunction as a bar fill, so negative bars come out red and positive ones green. The JSON text is shown below the chart.",
  section: "Theme",
  tags: ['registerFunction','theme','series.bar.bar.style.fill','JSON'],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Theme/Customize_Theme.md",
    "repo/docs/assets/api/en/API/function.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
