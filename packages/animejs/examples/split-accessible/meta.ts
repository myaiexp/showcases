// SplitText example: the accessible setting
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Split text accessible copy',
  summary: 'splitText() with accessible on or off. When on, a visually hidden copy of the text is inserted and the word spans become aria-hidden; a toggle reveals the copy and a readout describes the resulting structure. revert() undoes each split.',
  section: 'Text',
  tags: ['splitText', 'accessible', 'revert', 'aria-hidden'],
  docs: [
    'pages/animejs-com/documentation/text/splittext/textsplitter-settings/accessible.md',
    'pages/animejs-com/documentation/text/splittext/textsplitter-methods.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
