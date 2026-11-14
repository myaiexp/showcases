// Zdog example: Group eye, layers that keep their order
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Group eye',
  summary:
    'An eye looking around, built from a white, an iris, a pupil and a highlight lying on the same plane. In a Group they always draw in the order they were added, so the pupil never slips behind the white. Switch to a plain Anchor and the layers start to pop through each other as the eye turns.',
  section: 'Modeling',
  tags: ['Group', 'Anchor', 'Ellipse', 'copy', 'translate', 'fill'],
  docs: [
    'repo/modules/docs/modeling-concepts.hbs',
    'repo/modules/docs/group-concept.hbs',
    'repo/modules/docs/api-group.hbs',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
