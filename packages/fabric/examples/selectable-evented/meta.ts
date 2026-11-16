// fabric example: Canvas: selectable and evented per object
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Canvas: selectable and evented per object',
  summary:
    'selectable false stops an object from being selected and evented false removes it from pointer events altogether; mouse:down shows what each click hit.',
  section: 'Canvas',
  tags: ['selectable', 'evented', 'mouse:down', 'mouse:over'],
  docs: ['repo/src/content/docs/docs/Old docs/fabric-intro-part-1.md', 'repo/src/content/docs/api/classes/FabricObject.md', 'repo/src/content/docs/api/classes/Canvas.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
