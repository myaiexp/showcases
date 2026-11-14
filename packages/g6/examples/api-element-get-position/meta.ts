// g6 example: API element: getElementPosition
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "API element: getElementPosition",
  summary:
    "getElementPosition returns a node's [x, y]; the answer is read before and after translateElementTo moves the node.",
  section: 'API',
  tags: ['getElementPosition', 'translateElementTo'],
  docs: ['repo/packages/site/docs/api/element.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
