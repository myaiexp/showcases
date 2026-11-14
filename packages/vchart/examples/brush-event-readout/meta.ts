// vchart example: Brush events and selected data
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Brush events and selected data',
  summary:
    'The brushStart, brushChange and brushEnd events and the data they carry: a readout counts the points inside and outside the box and groups the inside ones by type. The card draws boxes through dispatched pointer events.',
  section: 'Concepts: Components',
  tags: ['brush', 'brushStart', 'brushChange', 'brushEnd', 'inBrushData', 'outOfBrushData'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Concepts/Brush.md',
    'repo/docs/assets/option/en/component/brush.md',
    'repo/docs/assets/api/en/API/event.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
