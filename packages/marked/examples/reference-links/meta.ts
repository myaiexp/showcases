// marked example: Reference links
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Reference links",
  summary:
    'A link can point at a name, such as [the menu][menu], with the address written once elsewhere in the text. It keeps long addresses out of sentences, and the definition line itself does not show.',
  section: 'Supported Markdown',
  tags: ['link','definition','reference'],
  docs: ['repo/docs/INDEX.md','repo/src/rules.ts','repo/src/Tokenizer.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
