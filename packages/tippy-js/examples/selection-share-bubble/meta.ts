// Tippy.js example: a Copy / Share bubble above whatever text is selected
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A bubble over selected text',
  summary:
    'Select some words in the paragraph and a small Copy / Share bubble appears right above the selection, the way article and note apps offer actions on highlighted text. The bubble is pointed at the highlight, not at a button.',
  section: 'Props: position',
  tags: ['getReferenceClientRect', 'trigger: manual', 'interactive', 'hideOnClick: false', 'show()', 'hide()'],
  docs: [
    'repo/website/src/pages/v6/all-props.mdx',
    'repo/website/src/pages/v6/methods.mdx',
    'repo/website/src/pages/v6/html-content.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
