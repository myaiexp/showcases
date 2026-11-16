// fabric example: Subclassing: a Star with its own _render
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Subclassing: a Star with its own _render',
  summary:
    'Star extends FabricObject and draws a star path in _render; points and innerRatio are listed in cacheProperties so changes repaint, and in customProperties so toObject saves them.',
  section: 'Subclassing',
  tags: ['FabricObject', '_render', 'cacheProperties', 'customProperties', '_renderPaintInOrder'],
  docs: [
    'repo/src/content/docs/docs/Old docs/fabric-intro-part-3.md',
    'repo/src/content/docs/docs/core-concepts.md',
    'repo/src/content/docs/api/classes/FabricObject.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
