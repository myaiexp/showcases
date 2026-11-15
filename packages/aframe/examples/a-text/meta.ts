// aframe example: <a-text>: every stock font, with attributes mapped to text
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: '<a-text>: every stock font, with attributes mapped to text',
  summary:
    '<a-text> wraps the text component: value, font, color, align and width are attributes that map to its properties. Each of the nine stock fonts sets one line, and a plane geometry gives the last one a surface the raycaster can hit.',
  section: 'Primitives',
  tags: ['a-text', 'text', 'value', 'font', 'align', 'width', 'color', 'stock fonts'],
  docs: ['repo/docs/primitives/a-text.md', 'repo/docs/components/text.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
