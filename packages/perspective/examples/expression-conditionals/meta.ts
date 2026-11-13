// Perspective example: conditional and numeric functions in expressions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Conditional and numeric expressions',
  summary: 'Turn numbers into labels with the ? : operator, test ranges with inrange(), compute percent_of(), clamp or round values, and bucket a numeric column to group it.',
  section: 'Expressions',
  tags: ['expressions', 'conditional', 'inrange', 'percent_of', 'clamp', 'bucket', 'group_by'],
  docs: ['repo/docs/md/explanation/view/config/expressions.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
