// penrose example: showError on a broken trio
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'showError on a broken trio',
  summary:
    'When a program fails to parse or check, `compile` resolves to an `Err` holding a `PenroseError`, and `showError` turns it into a message. Four trios break in different places: the docs\' "howdy pardner" nonsense, an undeclared type, an undeclared predicate and a shape property of the wrong type.',
  section: 'Language API',
  tags: ['showError', 'PenroseError', 'compile', 'isErr'],
  docs: [
    'repo/packages/docs-site/docs/ref/api.md',
    'repo/packages/docs-site/docs/ref/style/shapes-overview.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
