// Zdog example: Copy shapes, a picket fence from one picket
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Copy shapes',
  summary:
    'A picket fence where only the first board is described in full. Every other board comes from picket.copy(), passing just the new position and colour. Copying keeps all the other options, so repeated parts take one line each.',
  section: 'Modeling',
  tags: ['copy', 'Shape', 'translate', 'color', 'remove'],
  docs: [
    'repo/modules/docs/modeling-concepts.hbs',
    'repo/modules/docs/copy-example.hbs',
    'repo/modules/docs/api-anchor.hbs',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
