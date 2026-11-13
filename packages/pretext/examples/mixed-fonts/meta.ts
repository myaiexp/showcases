// Pretext example: body, bold and code runs in one paragraph
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bold, code and body in one paragraph',
  summary:
    'Items in Inter 400, Inter 700 and JetBrains Mono share one paragraph. Code spans carry their background padding as extraWidth and are charged it on every line they wrap onto, so each wrapped piece is padded on both sides.',
  section: 'Rich inline',
  tags: ['prepareRichInline', 'mixed fonts', 'code span', 'extraWidth'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
