// Pretext: multiline text measurement and line layout without touching the DOM
import { definePackage } from '@/types.ts';

export default definePackage({
  name: 'Pretext',
  npm: '@chenglou/pretext',
  tagline: 'Measure and lay out multiline text in pure JavaScript, with no DOM reflow.',
  about:
    'Pretext measures text segments once with canvas, then answers "how tall is this paragraph at this width?" with pure arithmetic. The same prepared handle gives you every line, its width and its cursors, so you can shrink-wrap bubbles, balance headlines, flow text around shapes and paint to DOM, Canvas or SVG. A rich-inline entry point lays out mixed fonts, mentions and inline boxes as one paragraph.',
  category: 'Text',
  homepage: 'https://github.com/chenglou/pretext',
  docsUrl: 'https://github.com/chenglou/pretext#api',
  repo: 'https://github.com/chenglou/pretext',
  added: '2026-11-13',
  // README order: the two use cases, the rich-inline helper, the other helpers, caveats.
  sections: ['Measure height', 'Manual line layout', 'Rich inline', 'Other helpers', 'Caveats'],
});
