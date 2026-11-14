// Tippy.js example: the same string shown as HTML or as plain text
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Rich text or plain text',
  summary:
    'By default Tippy treats tip text as plain text, so tags show up literally, which keeps unknown text safe. Turn on allowHTML for text you wrote yourself and the same string becomes bold and coloured.',
  section: 'Props: look',
  tags: ['allowHTML', 'content'],
  docs: ['repo/website/src/pages/v6/all-props.mdx', 'repo/website/src/pages/index.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
