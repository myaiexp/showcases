// animejs example: Split addEffect surviving resize
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Split addEffect surviving resize',
  summary: 'Register a line animation with addEffect() so it is rebuilt each time the text reflows. Drag the width slider and watch the lines re-split without the animation stopping.',
  section: 'Text',
  tags: ['splitText', 'lines', 'addEffect', 'revert', 'ResizeObserver'],
  docs: [
    'pages/animejs-com/documentation/text/splittext/textsplitter-methods/addeffect.md',
    'pages/animejs-com/documentation/text/splittext/textsplitter-methods/revert.md',
    'pages/animejs-com/documentation/text/splittext/textsplitter-settings/lines.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
