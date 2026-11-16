// fabric example: Extensions: AligningGuidelines custom targets
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Extensions: AligningGuidelines custom targets',
  summary:
    'getObjectsByTarget limits the guides to shapes of the same colour and getPointMap limits them to the dragged shape\'s top-left corner. Both are options of the AligningGuidelines constructor.',
  section: 'Extensions',
  tags: ['AligningGuidelines', 'getObjectsByTarget', 'getPointMap', 'getCoords'],
  docs: [
    'repo/extensions/aligning_guidelines/README.MD',
    'repo/src/content/docs/api/classes/FabricObject.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
