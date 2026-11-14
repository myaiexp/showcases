// vchart example: softMin and softMax: a floor and a ceiling that give way
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'softMin and softMax: a floor and a ceiling that give way',
  summary:
    'softMin and softMax set a range that only applies while the data stays inside it: a soft floor above the data minimum is ignored, one below it is honoured. Sliders move both over a line of values between 45 and 78.',
  section: 'Concepts: Axes',
  tags: ['axes.softMin', 'axes.softMax', 'linear axis'],
  docs: ['repo/docs/assets/guide/en/tutorial_docs/Chart_Concepts/Axes.md', 'repo/docs/assets/option/en/component/axis-common/linear-axis.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
