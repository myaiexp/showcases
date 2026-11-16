// fabric example: Canvas: centeredScaling and centeredRotation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Canvas: centeredScaling and centeredRotation',
  summary:
    'centeredScaling scales around the object centre instead of the opposite corner, and centeredRotation decides whether it turns around its centre or its origin.',
  section: 'Canvas',
  tags: ['centeredScaling', 'centeredRotation', 'originX', 'originY'],
  docs: ['repo/src/content/docs/api/classes/Canvas.md', 'repo/src/content/docs/api/classes/FabricObject.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
