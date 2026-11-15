// penrose example: What literal types forbid
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'What literal types forbid',
  summary:
    'Number and String are reserved. Each tab breaks one rule from the docs (declaring `type Number`, writing `Set <: Number`, returning a Number from a function) and Penrose rejects the Domain with an error. The first tab is the valid use.',
  section: 'Domain',
  tags: ['Number', 'String', 'literal', 'error', 'subtype'],
  docs: ['repo/packages/docs-site/docs/ref/domain/types.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
