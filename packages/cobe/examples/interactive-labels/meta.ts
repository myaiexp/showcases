// cobe example: clickable labels anchored to markers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Interactive labels',
  summary:
    'City labels are buttons: click one and it expands to show the coordinates, click again to close it. They follow their markers with CSS anchors and need pointer-events: auto to receive clicks. In the card the selection moves on its own.',
  section: 'Custom Labels',
  tags: ['--cobe-{id}', '--cobe-visible-{id}', 'position-anchor', 'pointer-events', 'id'],
  docs: ['repo/website/app/components/CustomLabels.tsx'],
  provenance: 'pure',
  added: '2026-11-15',
});
