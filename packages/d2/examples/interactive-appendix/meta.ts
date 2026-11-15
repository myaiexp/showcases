// d2 example: Appendix for static exports
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Appendix for static exports',
  summary:
    'The `forceAppendix` render option numbers every tooltip and link and lists them in a table under the diagram, which is how D2 exports to formats without hover or click. The first tab is the normal SVG, the second forces the appendix.',
  section: 'Interactive',
  tags: ['tooltip', 'link', 'appendix', 'forceAppendix'],
  docs: ['repo/docs/tour/interactive.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
