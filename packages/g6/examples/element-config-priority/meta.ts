// g6 example: Element: where a style is set
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Element: where a style is set',
  summary:
    'A fill written in the data, a fill in new Graph({ node }), and a later setNode call. The graph option beats the data and setNode beats both, as the overview lists them.',
  section: 'Element',
  tags: ['node.style', 'data.nodes.style', 'setNode'],
  docs: [
    'repo/packages/site/docs/manual/element/overview.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
