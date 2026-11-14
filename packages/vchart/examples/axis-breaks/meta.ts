// vchart example: Axis breaks: cutting out a value range
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Axis breaks: cutting out a value range',
  summary:
    'A value axis can skip a stretch of values that holds no data with breaks, drawing a break symbol where the scale jumps. The range sliders move the cut, and the gap slider sets the symbol spacing, so a chart of tiny and huge bars stays readable.',
  section: 'Concepts: Axes',
  tags: ['axes.breaks', 'breaks.range', 'breakSymbol', 'gap'],
  docs: ['repo/docs/assets/guide/en/tutorial_docs/Chart_Concepts/Axes.md', 'repo/docs/assets/option/en/component/axis-common/linear-axis.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
