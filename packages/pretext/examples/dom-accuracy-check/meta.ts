// pretext example: check layout() heights against painted DOM elements
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Check predictions against the DOM',
  summary:
    'A batch of Latin, CJK, Arabic, emoji and Thai strings at several widths: layout() height against the painted element height, as a pass/fail grid with a match rate. The check the Caveats ask you to run in your own browser.',
  section: 'Caveats',
  tags: ['accuracy', 'getBoundingClientRect', 'lang', 'fonts', 'multilingual'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
