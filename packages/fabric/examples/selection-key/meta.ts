// fabric example: Selection: selectionKey for multi-select
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Selection: selectionKey for multi-select',
  summary:
    'canvas.selectionKey sets which modifier key (shift by default) turns a click into "add to the selection". It takes one key name, an array of several, or null to turn click multi-select off.',
  section: 'Selection',
  tags: ['selectionKey', 'ActiveSelection', 'getActiveObjects'],
  docs: [
    'repo/src/content/docs/docs/Old docs/v2-breaking-changes.md',
    'repo/src/content/docs/api/classes/Canvas.md',
    'repo/src/content/docs/api/interfaces/CanvasOptions.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
