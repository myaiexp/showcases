// fabric example: Controls: Touch size of controls
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Controls: Touch size of controls',
  summary:
    "cornerSize is the drawn handle, touchCornerSize the larger area that touch input hits. A single Control can override both with sizeX/sizeY and touchSizeX/touchSizeY; the dashed outlines show each handle's touch area.",
  section: 'Controls',
  tags: ['cornerSize','touchCornerSize','sizeX','sizeY','touchSizeX','touchSizeY','oCoords','Control'],
  docs: ['repo/src/content/docs/docs/Old docs/control-api.md', 'repo/src/content/docs/api/classes/FabricObject.md', 'repo/src/content/docs/api/classes/Control.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
