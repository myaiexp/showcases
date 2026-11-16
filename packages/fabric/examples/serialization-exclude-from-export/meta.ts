// fabric example: Serialization: excludeFromExport hides helper objects
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Serialization: excludeFromExport hides helper objects',
  summary:
    'Guide lines and a frame sit on the canvas as ordinary objects. Setting excludeFromExport on them removes them from canvas.toJSON() and canvas.toSVG() while they stay visible.',
  section: 'Serialization',
  tags: ['excludeFromExport', 'toJSON', 'toSVG', 'Line'],
  docs: [
    'repo/src/content/docs/docs/Old docs/fabric-intro-part-3.md',
    'repo/src/content/docs/api/classes/FabricObject.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
