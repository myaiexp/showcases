// fabric example: Utilities: capValue and getRandomInt
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Utilities: capValue and getRandomInt',
  summary:
    'util.capValue(min, value, max) keeps a dragged dot inside a resizable box, and util.getRandomInt(min, max) scatters gold markers at random integer positions within it.',
  section: 'Utilities',
  tags: ['util.capValue', 'util.getRandomInt', 'object:moving'],
  docs: [
    'repo/src/content/docs/api/namespaces/util/functions/capValue.md',
    'repo/src/content/docs/api/namespaces/util/functions/getRandomInt.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
