// d2 example: LaTeX line breaks with displaylines
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'LaTeX line breaks with displaylines',
  summary:
    'The latest MathJax lacks line breaks inside a formula. The `\\displaylines{ ... \\\\ ... }` command stacks several lines, as the single-line version shows next to it.',
  section: 'Text & Code',
  tags: ['latex', 'displaylines'],
  docs: ['repo/docs/tour/text.md', 'repo/static/d2/latex.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});
