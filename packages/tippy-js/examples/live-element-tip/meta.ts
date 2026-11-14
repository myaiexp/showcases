// Tippy.js example: a working colour picker element as tip content
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A working widget inside a tip',
  summary:
    'Pass a real element instead of text and it keeps working inside the tip. Click the button, pick a swatch or drag the slider, and the heading on the page changes colour.',
  section: 'HTML content',
  tags: ['content: Element', 'interactive', 'trigger: click'],
  docs: ['repo/website/src/pages/v6/html-content.mdx', 'repo/website/src/pages/v6/all-props.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
