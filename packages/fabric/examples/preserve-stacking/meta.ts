// fabric example: Canvas: preserveObjectStacking
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Canvas: preserveObjectStacking',
  summary:
    'With preserveObjectStacking false the selected object is painted above the rest while it stays selected; the v7 default keeps the stack order.',
  section: 'Canvas',
  tags: ['preserveObjectStacking', 'getActiveObject'],
  docs: ['repo/src/content/docs/api/classes/Canvas.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
