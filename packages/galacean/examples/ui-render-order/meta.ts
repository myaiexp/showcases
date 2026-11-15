// galacean example: UI render order
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "UI render order",
  summary:
    "Overlapping UI images draw depth first in sibling order: a child sits above its parent but below the next sibling, and moving siblingIndex reorders them; setting priority changes nothing. A select reorders in the full view.",
  section: "UI",
  tags: ['siblingIndex', 'UIRenderer.priority', 'Image'],
  docs: [
    'repo/docs/en/UI/quickStart/order.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
