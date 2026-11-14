// Tippy.js example: a tip that keeps up with an element that is moving
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Following something that moves',
  summary:
    'Two delivery vans drive back and forth with an "Arriving in 4 min" tip. The top tip is left behind where it first appeared. The bottom one is told to stick, so it rides along with the van.',
  section: 'Props: position',
  tags: ['sticky', 'plugins', 'showOnCreate', 'trigger: manual'],
  docs: ['repo/website/src/pages/v6/all-props.mdx', 'repo/website/src/pages/v6/plugins.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
