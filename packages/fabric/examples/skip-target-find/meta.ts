// fabric example: Canvas: skipTargetFind
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Canvas: skipTargetFind',
  summary:
    'skipTargetFind true makes pointer events ignore all objects: they still draw but cannot be selected or dragged.',
  section: 'Canvas',
  tags: ['skipTargetFind', 'selection:created'],
  docs: ['repo/src/content/docs/api/classes/Canvas.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
