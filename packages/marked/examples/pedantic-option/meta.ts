// marked example: Original rules: pedantic
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Original rules: pedantic',
  summary:
    'Three snippets rendered with the default rules and with pedantic: true, which follows the original 2004 markdown.pl. A heading with no space after the hash, mixed bullet characters and a fenced block all come out differently.',
  section: 'Options',
  tags: ['pedantic', 'new Marked', 'options'],
  docs: ['repo/docs/USING_ADVANCED.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
