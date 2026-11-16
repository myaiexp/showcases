// fabric example: Controls: A delete control with a custom render
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Controls: A delete control with a custom render',
  summary:
    "A Control placed beside the box with its own render() that draws a red x with canvas calls, and a mouseUpHandler that removes the object. One Control instance is shared by three shapes.",
  section: 'Controls',
  tags: ['Control','render','mouseUpHandler','offsetX','offsetY','sizeX','canvas.remove'],
  docs: ['repo/src/content/docs/docs/Old docs/control-api.md', 'repo/src/content/docs/api/classes/Control.md', 'repo/src/content/docs/api/classes/FabricObject.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
