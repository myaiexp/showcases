// Utilities example: Utils remove() targets and properties
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Utils remove() targets and properties',
  summary: 'Two squares share one looping animation with an update counter. remove() either detaches the first square from every animation, or only its x property from the shared animation so the rotation keeps going.',
  section: 'Utilities',
  tags: ['utils.remove', 'animate', 'onUpdate'],
  docs: [
    'pages/animejs-com/documentation/utilities/remove.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
