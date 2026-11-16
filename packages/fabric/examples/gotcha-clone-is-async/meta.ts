// fabric example: Gotchas: clone is asynchronous
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Gotchas: clone is asynchronous',
  summary:
    'rect.clone() returns a Promise in v7: without await the copy is not a Rect and has no set(). The guide\'s static util.object.clone is gone (util has no object namespace); structuredClone() copies plain data.',
  section: 'Gotchas',
  tags: ['clone', 'Promise', 'util', 'structuredClone'],
  docs: [
    'repo/src/content/docs/docs/Old docs/gotchas.md',
    'repo/src/content/docs/api/classes/FabricObject.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
