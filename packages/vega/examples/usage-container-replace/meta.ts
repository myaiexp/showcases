// vega example: Usage: Container Replace
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Usage: A View Replaces Its Container\'s Content',
  summary:
    'A container starts with a paragraph of placeholder text; the first View built on it removes the paragraph, and a second View on the same container replaces the first chart, with the child count shown at each step.',
  section: 'Usage',
  tags: ['view.container', 'view.initialize', 'view.finalize'],
  docs: ['repo/docs/usage/index.md', 'repo/docs/docs/api/view.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
