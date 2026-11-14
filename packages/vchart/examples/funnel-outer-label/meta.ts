// vchart example: Funnel outerLabel
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Funnel outerLabel",
  summary:
    "outerLabel moves the stage names outside the funnel on guide lines while label keeps the values inside. position puts them left or right, alignLabel lines them up in a column and line.minLength sets the guide line length.",
  section: "Funnel",
  tags: ['funnel', 'outerLabel', 'position', 'alignLabel', 'line.minLength', 'label'],
  docs: [
    'repo/docs/assets/option/en/series/funnel.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
