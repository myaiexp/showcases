// g6 example: Graph extension: getExtension and getExtensions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Graph extension: getExtension and getExtensions',
  summary:
    'getExtensions(category) returns the registered types of a category. One node is drawn per registered name for nodes, edges, layouts and plugins.',
  section: 'Graph',
  tags: ['getExtension', 'getExtensions', 'ExtensionCategory'],
  docs: [
    'repo/packages/site/docs/manual/graph/extension.en.md',
    'repo/packages/site/docs/manual/graph/extensions.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
