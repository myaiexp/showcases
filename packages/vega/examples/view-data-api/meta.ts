// vega example: View: Data API
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'View: data, insert and remove',
  summary:
    'Bars editable through view.insert, view.remove (by predicate or by tuples) and the two-argument view.data, while a data listener on a filtered pipeline reports its new size and the getter reads back the transform output.',
  section: 'View API',
  tags: ['view.data', 'view.insert', 'view.remove', 'view.addDataListener', 'transform.filter'],
  docs: ['repo/docs/docs/api/view.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
