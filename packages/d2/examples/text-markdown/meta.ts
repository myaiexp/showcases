// d2 example: Standalone text is Markdown
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Standalone text is Markdown',
  summary:
    'A key whose value is `|md ... |` is a standalone Markdown block with headers, lists and emphasis. D2 sizes the shape around the rendered text.',
  section: 'Text & Code',
  tags: ['markdown', 'block string'],
  docs: ['repo/docs/tour/text.md', 'repo/static/d2/markdown.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});
