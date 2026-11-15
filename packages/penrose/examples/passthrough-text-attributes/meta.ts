// penrose example: Text passthrough: letterSpacing and textDecoration
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Text passthrough: letterSpacing and textDecoration',
  summary:
    'Text has fonts and anchors but not letter spacing or underlines. `letterSpacing : "6px"` and `textDecoration : "underline"` pass straight through as `letter-spacing` and `text-decoration`. Penrose measures text without them, so tight boxes would be off.',
  section: 'Passthrough SVG',
  tags: ['letterSpacing', 'textDecoration', 'passthrough', 'Text'],
  docs: ['repo/packages/docs-site/docs/ref/style/passthrough.md', 'repo/packages/docs-site/docs/ref/style/shapes/text.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
