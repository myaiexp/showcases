// cosmos-gl example: Host-driven drag with pinning
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Host-driven drag with pinning',
  summary:
    'The page implements point dragging itself. On pointer down it calls setPinnedPoint(index, true), on every move setPointPosition(index, x, y) with the pointer converted by screenToSpacePosition, and on release it unpins the point. Turn pinning off to see the layout’s forces pull the point back at once.',
  section: 'Headless & shared device',
  tags: ['setPinnedPoint', 'setPointPosition', 'isPointPinned', 'screenToSpacePosition', 'enableDrag'],
  docs: ['repo/docs/host-embedding/README.md', 'repo/src/stories/api-reference.mdx', 'repo/src/stories/configuration.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
