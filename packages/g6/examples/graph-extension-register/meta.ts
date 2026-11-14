// g6 example: Graph extension: register a node and a combo
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Graph extension: register a node and a combo',
  summary:
    'register() adds a custom node and a custom combo under one name, which is allowed across categories; node.type and combo.type then use that name.',
  section: 'Graph',
  tags: ['register', 'getExtension', 'ExtensionCategory', 'node.type', 'combo.type'],
  docs: [
    'repo/packages/site/docs/manual/graph/extension.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
