// Zdog example: a sun badge resized from code with setSize
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Set size',
  summary:
    'A smiling sun badge that you can shrink to an icon or grow to a poster from code. setSize(width, height) resizes the element and, on a canvas, keeps it sharp on high-density screens. It leaves zoom alone, so the example sets zoom itself to keep the whole badge in view.',
  section: 'API: Illustration',
  tags: ['Illustration', 'setSize', 'zoom', 'canvas'],
  docs: ['repo/modules/docs/api-illo.hbs'],
  provenance: 'pure',
  added: '2026-11-14',
});
