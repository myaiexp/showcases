// g6 example: Node type and size from a function
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Node type and size from a function',
  summary:
    'node.type can be a function of the datum: node-1 is a circle and node-2 a rect, both with size 20. Switch the full view to an array size such as [20, 10] for a 20x10 rect.',
  section: 'Getting Started',
  tags: ['node.type', 'callback', 'size', 'circle', 'rect'],
  docs: ['repo/packages/site/docs/manual/getting-started/step-by-step.en.md', 'repo/packages/site/common/manual/getting-started/step-by-step/elements-2.md', 'repo/packages/site/docs/api/element.en.md', 'repo/packages/site/docs/api/render.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
