// vchart example: Funnel quick start
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Funnel quick start",
  summary:
    "A funnel chart stacks one layer per stage, each as wide as its value: categoryField names the layers and valueField sizes them, with label showing the numbers. updateData supplies a new, still shrinking funnel every two seconds.",
  section: "Funnel",
  tags: ['funnel', 'categoryField', 'valueField', 'label', 'updateData'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Funnel.md',
    'repo/docs/assets/option/en/series/funnel.md',
    'repo/docs/assets/option/en/chart/funnel.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
