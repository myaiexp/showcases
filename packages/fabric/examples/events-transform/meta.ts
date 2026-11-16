// fabric example: Events: moving, scaling, rotating, skewing, modified
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Events: moving, scaling, rotating, skewing, modified',
  summary:
    'The object:moving, object:scaling, object:rotating and object:skewing events fire on every pointer step of a transform with the transform info; object:modified fires once when it ends and names the action.',
  section: 'Events',
  tags: ['object:moving', 'object:scaling', 'object:rotating', 'object:skewing', 'object:modified', 'transform', 'BasicTransformEvent'],
  docs: [
    'repo/src/content/docs/docs/Old docs/fabric-intro-part-2.md',
    'repo/src/content/docs/docs/Old docs/v5-breaking-changes.md',
    'repo/src/content/docs/api/interfaces/CanvasEvents.md',
    'repo/src/content/docs/api/interfaces/BasicTransformEvent.md',
    'repo/src/content/docs/api/interfaces/ModifiedEvent.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
