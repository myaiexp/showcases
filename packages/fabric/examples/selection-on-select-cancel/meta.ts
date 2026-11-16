// fabric example: Selection: onSelect and onDeselect can refuse
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Selection: onSelect and onDeselect can refuse',
  summary:
    'An object\'s onSelect and onDeselect hooks run before a selection change and cancel it by returning true, which lets one shape refuse to be selected and another refuse to be deselected.',
  section: 'Selection',
  tags: ['onSelect', 'onDeselect', 'setActiveObject', 'selection:created'],
  docs: [
    'repo/src/content/docs/docs/Old docs/v2-breaking-changes.md',
    'repo/src/content/docs/api/classes/FabricObject.md',
    'repo/src/content/docs/api/classes/Canvas.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
