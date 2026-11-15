// css-doodle example: Shadows spread on both sides
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Shadows spread on both sides',
  summary:
    'Seven shadows are offset by calc(@nd * 14px), so they spread evenly left and right of the dot. Operations are not arguments of @nd, so the math is written in calc() around it.',
  section: 'Sequence',
  tags: ['@nd', '@m', 'box-shadow', 'calc'],
  docs: [
    'pages/css-doodle-com/reference/function-nd.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
