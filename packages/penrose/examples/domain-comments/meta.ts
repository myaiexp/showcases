// penrose example: Comments in all programs
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Comments in all programs',
  summary:
    'Domain and Substance comments start with two dashes and are ignored by the parser, whole-line or after code. The editor opens on the Domain, whose comment lines explain every declaration, and the diagram is the same as without them.',
  section: 'Domain',
  tags: ['comment', 'type', 'predicate'],
  docs: [
    'repo/packages/docs-site/docs/ref/domain/overview.md',
    'repo/packages/docs-site/docs/ref/substance/overview.md',
    'repo/packages/core/src/lib/Functions.ts',
    'repo/packages/core/src/lib/Constraints.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
