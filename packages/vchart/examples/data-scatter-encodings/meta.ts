// vchart example: One datum per mark: shape, size, colour and state
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'One datum per mark: shape, size, colour and state',
  summary:
    'A scatter chart encodes four fields of a flat dataset: shape by class through an ordinal scale, size by score through a linear scale, colour by day through seriesField, and a custom state paints scores over a threshold red.',
  section: 'Concepts: Series, Marks and Data',
  tags: ['scatter', 'shape', 'shapeField', 'size', 'sizeField', 'seriesField', 'point.state', 'filter'],
  docs: ['repo/docs/assets/guide/en/tutorial_docs/Chart_Concepts/Data/Data_Types_and_Interface.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
